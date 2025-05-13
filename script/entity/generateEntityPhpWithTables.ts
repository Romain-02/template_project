import { Entity, EntityAttribute } from "../xmlToEntities";
import { capitalize, mapType, uncapitalize } from "../utils";
import { getFilterAttributes, getFilterImports } from "./filters/generateFilters";
import { getSerializationGroups } from "./groups/generateGroups";

class EntityGenerator {
    constructor(private entity: Entity, private allEntities: Entity[]) {}

    private generateColumnAttribute(doctrineType: string, isNullable: boolean): string {
        return doctrineType
            ? `    #[ORM\\Column(type: '${doctrineType}', nullable: ${isNullable})]`
            : `    #[ORM\\Column(nullable: ${isNullable})]`;
    }

    private generateCardinalityAttribute(
        isNullable: boolean,
        cardinality: string,
        targetEntity: string
    ): string {
        const joinColumn = `    #[ORM\\JoinColumn(nullable: ${isNullable})]\n`;

        const mapping: Record<string, string> = {
            ManyToOne: `    #[ORM\\ManyToOne(targetEntity: ${targetEntity}::class)]`,
            OneToOne: `    #[ORM\\OneToOne(targetEntity: ${targetEntity}::class)]`,
            OneToMany: `    #[ORM\\OneToMany(targetEntity: ${targetEntity}::class, mappedBy: '${uncapitalize(this.entity.name)}')]`
        };

        return joinColumn + (mapping[cardinality] || '');
    }

    private generateProperty(attribute: EntityAttribute): string {
        const {
            name,
            phpType,
            doctrineType,
            isNullable,
            cardinality
        } = attribute;

        const isId = name.toLowerCase() === 'id';
        const nullableFlag = isNullable ? '?' : '';
        const defaultValue = isNullable ? ' = null' : '';
        const type = cardinality === "OneToMany" ? "Collection" : phpType;
        const groups = getSerializationGroups(this.entity.name, this.allEntities);

        let prop = '';

        if (isId) {
            prop += `    #[ORM\\Id]\n    #[ORM\\GeneratedValue]\n`;
        }

        if (cardinality) {
            prop += this.generateCardinalityAttribute(isNullable, cardinality, phpType) + '\n';
        } else {
            prop += this.generateColumnAttribute(doctrineType, isNullable) + '\n';
        }

        prop += `${groups}`;
        prop += `    private ${nullableFlag}${type} $${uncapitalize(name)}${defaultValue};\n`;

        return prop;
    }

    private generateGetter(attribute: EntityAttribute): string {
        const { name, phpType, isNullable, cardinality } = attribute;
        const methodName = capitalize(name);
        const nullableFlag = isNullable ? '?' : '';
        const returnType = cardinality === "OneToMany" ? "Collection" : phpType;

        let getter = cardinality === "OneToMany"
            ? this.generateCollectionMethods(attribute)
            : '';

        return getter + `    public function get${methodName}(): ${nullableFlag}${returnType}\n` +
            `    {\n        return \$this->${uncapitalize(name)};\n    }\n`;
    }

    private generateSetter(attribute: EntityAttribute): string {
        if (attribute.cardinality === "OneToMany") {
            return '';
        }

        const { name, phpType, isNullable } = attribute;
        const methodName = capitalize(name);
        const nullableFlag = isNullable ? '?' : '';

        return `    public function set${methodName}(${nullableFlag}${phpType} $${name}): self\n` +
            `    {\n        \$this->${uncapitalize(name)} = $${name};\n        return \$this;\n    }\n`;
    }

    private generateCollectionMethods(attribute: EntityAttribute): string {
        const { name, phpType } = attribute;
        const attributeName = uncapitalize(name);
        const singularName = attributeName.slice(0, attributeName.length - 1);

        return `    
    public function add${capitalize(singularName)}(${phpType} $${singularName}): self
    {
        if (!$this->${attributeName}->contains($${singularName})) {
            $this->${attributeName}[] = $${singularName};
            $${singularName}->set${capitalize(this.entity.name)}($this);
        }
    
        return $this;
    }
    
    public function remove${capitalize(singularName)}(${phpType} $${singularName}): self
    {
        if ($this->${attributeName}->contains($${singularName})) {
            $this->${attributeName}->removeElement($${singularName});
            if ($${singularName}->get${capitalize(this.entity.name)}() === $this) {
                $${singularName}->set${capitalize(this.entity.name)}(null);
            }
        }

        return $this;
    }\n`;
    }

    public generate(): string {
        const className = capitalize(this.entity.name);
        const classGroup = uncapitalize(this.entity.name);
        let props = '';
        let methods = '';

        for (const attr of this.entity.attributes) {
            props += this.generateProperty(attr) + '\n';
            methods += this.generateGetter(attr) + '\n';
            if (attr.name.toLowerCase() !== 'id') {
                methods += this.generateSetter(attr) + '\n';
            }
        }

        return `<?php

namespace App\\Entity;

use Doctrine\\ORM\\Mapping as ORM;
use ApiPlatform\\Metadata\\ApiResource;
use ApiPlatform\\Metadata\\ApiFilter;
use Doctrine\\Common\\Collections\\Collection;
use Symfony\\Component\\Serializer\\Attribute\\Groups;
${getFilterImports(this.entity.attributes)}

#[ORM\\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['${classGroup}:read']],
    denormalizationContext: ['groups' => ['${classGroup}:write']],
)]
${getFilterAttributes(this.entity.attributes)}
class ${className}
{
${props}
${methods}}`;
    }
}

export function generateEntity(entity: Entity, entities: Entity[]): string {
    const generator = new EntityGenerator(entity, entities);
    return generator.generate();
}