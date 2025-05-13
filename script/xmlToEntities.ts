import * as fs from 'fs-extra';
import { XMLParser } from 'fast-xml-parser';
import {
    isEntity,
    mapType,
    pluralizeIfNeeded,
    removeUnderscoreAtFirstChar,
    uncapitalize,
    underscoreAtFirstCharNameToType
} from "./utils";

export type EntityAttribute = {
    name: string;
    phpType: string;
    doctrineType: string;
    isNullable: boolean;
    cardinality: "ManyToOne" | "OneToOne" | "OneToMany" | null;
};

export type Entity = {
    name: string;
    attributes: EntityAttribute[];
};

type Table = {
    Name: string;
    Column: Column[];
    FK: ForeignKey[];
    AK?: AlternativeKey[];
};

type Column = {
    Name: string;
    Type: string;
    Property?: string;
};

type ForeignKey = {
    Key: string;
    Reference: string;
};

type AlternativeKey = {
    Key: string;
};

class EntityConverter {
    private tables: Table[];

    constructor(xmlContent: string) {
        const parser = new XMLParser();
        const data = parser.parse(xmlContent);
        this.tables = this.normalizeTables(data);
    }

    private normalizeTables(data: any): Table[] {
        const rawTables = Array.isArray(data.Database.Table)
            ? data.Database.Table
            : [data.Database.Table];

        return rawTables.map(table => this.ensureArrayFields(table));
    }

    private ensureArrayFields(table: any): Table {
        Object.keys(table).forEach(key => {
            if (key !== 'Name' && !Array.isArray(table[key])) {
                table[key] = [table[key]];
            }
        });
        return table as Table;
    }

    private isPrimaryKey(columnName: string): boolean {
        return columnName === "id";
    }

    private isForeignKey(columnName: string): boolean {
        return columnName.includes("id_");
    }

    private isAlternativeKey(columnName: string, alternativeKeys?: AlternativeKey[]): boolean {
        return alternativeKeys?.some(ak => ak.Key === columnName) ?? false;
    }

    private getEntityNameFromReference(reference: string): string {
        return reference.slice(0, reference.indexOf('(id)'));
    }

    private resolveForeignKey(
        columnName: string,
        foreignKeys: ForeignKey[],
        alternativeKeys?: AlternativeKey[]
    ): { entityName: string, cardinality: "ManyToOne" | "OneToOne" } {
        const foreignKey = foreignKeys.find(fk => fk.Key === columnName);
        if (!foreignKey) {
            throw new Error(`No foreign key found for column ${columnName}`);
        }

        let entityName = this.getEntityNameFromReference(foreignKey.Reference);
        const sameTypeForeignKeys = foreignKeys.filter(fk => fk.Reference === foreignKey.Reference);
        const index = sameTypeForeignKeys.indexOf(foreignKey);

        if (index > 2) {
            entityName += index;
        }

        const cardinality = this.isAlternativeKey(columnName, alternativeKeys)
            ? "OneToOne"
            : "ManyToOne";

        return { entityName, cardinality };
    }

    private convertColumnToAttribute(
        column: Column,
        table: Table
    ): EntityAttribute {
        const isPrimaryKey = this.isPrimaryKey(column.Name);
        const isForeignKey = this.isForeignKey(column.Name);

        if (isForeignKey) {
            const { entityName, cardinality } = this.resolveForeignKey(
                column.Name,
                table.FK,
                table.AK
            );

            const { doctrineType, phpType } = mapType(entityName);

            return {
                name: uncapitalize(removeUnderscoreAtFirstChar(entityName)),
                phpType,
                doctrineType,
                isNullable: !column.Property?.includes('NOT NULL') && !isPrimaryKey,
                cardinality: isEntity(doctrineType) ? cardinality : null
            };
        }

        const { doctrineType, phpType } = mapType(column.Type);

        return {
            name: column.Name,
            phpType,
            doctrineType,
            isNullable: !column.Property?.includes('NOT NULL') && !isPrimaryKey,
            cardinality: null
        };
    }

    private convertTableToEntity(table: Table): Entity {
        return {
            name: underscoreAtFirstCharNameToType(table.Name),
            attributes: table.Column.map(column =>
                this.convertColumnToAttribute(column, table)
            )
        };
    }

    private addRelationships(entities: Entity[]): Entity[] {
        return entities.map(targetEntity => {
            const newAttributes: EntityAttribute[] = [];

            entities.forEach(sourceEntity => {
                let oneToOneCount = 0;
                let oneToManyCount = 0;

                sourceEntity.attributes.forEach(attr => {
                    if (attr.phpType === targetEntity.name) {
                        let relationName = sourceEntity.name;
                        let cardinality: "OneToOne" | "OneToMany" =
                            attr.cardinality === "OneToOne" ? "OneToOne" : "OneToMany";

                        if (cardinality === "OneToMany") {
                            oneToManyCount++;
                            relationName = pluralizeIfNeeded(relationName);
                            if (oneToManyCount > 1) relationName += oneToManyCount;
                        } else {
                            oneToOneCount++;
                            if (oneToOneCount > 1) relationName += oneToOneCount;
                        }

                        newAttributes.push({
                            name: relationName,
                            phpType: sourceEntity.name,
                            doctrineType: mapType(sourceEntity.name).doctrineType,
                            isNullable: false,
                            cardinality
                        });
                    }
                });
            });

            return {
                ...targetEntity,
                attributes: [...targetEntity.attributes, ...newAttributes]
            };
        });
    }

    public async convertToEntities(): Promise<Entity[]> {
        const entities = this.tables.map(table => this.convertTableToEntity(table));
        return this.addRelationships(entities);
    }
}

export async function xmlToEntities(xmlFile: string): Promise<Entity[]> {
    const xmlContent = await fs.readFile(xmlFile, 'utf8');
    const converter = new EntityConverter(xmlContent);
    return converter.convertToEntities();
}