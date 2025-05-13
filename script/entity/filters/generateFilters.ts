import { EntityAttribute } from "../../xmlToEntities";
import { isEntity, mapType } from "../../utils";

type FilterDefinitions = {
    searchFilters: string;
    dateFilters: string;
    numericFilters: string;
    orderFilters: string;
};

export class FilterGenerator {
    constructor(private attributes: EntityAttribute[]) {}

    public getFilterImports(): string {
        const filters = this.generateAllFilters();

        return [
            filters.searchFilters && 'use ApiPlatform\\Doctrine\\Orm\\Filter\\SearchFilter;',
            filters.dateFilters && 'use ApiPlatform\\Doctrine\\Orm\\Filter\\DateFilter;',
            filters.numericFilters && 'use ApiPlatform\\Doctrine\\Orm\\Filter\\NumericFilter;',
            filters.orderFilters && 'use ApiPlatform\\Doctrine\\Orm\\Filter\\OrderFilter;',
        ].filter(Boolean).join('\n');
    }

    public getFilterAttributes(): string {
        const filters = this.generateAllFilters();

        return [
            filters.searchFilters && this.createFilterAttribute('SearchFilter', filters.searchFilters),
            filters.dateFilters && this.createFilterAttribute('DateFilter', filters.dateFilters),
            filters.numericFilters && this.createFilterAttribute('NumericFilter', filters.numericFilters),
            filters.orderFilters && this.createFilterAttribute('OrderFilter', filters.orderFilters),
        ].filter(Boolean).join('\n');
    }

    private createFilterAttribute(filterType: string, properties: string): string {
        return `#[ApiFilter(${filterType}::class, properties: [\n${properties}\n])]`;
    }

    private generateAllFilters(): FilterDefinitions {
        return {
            searchFilters: this.generateSearchFilters(),
            dateFilters: this.generateDateFilters(),
            numericFilters: this.generateNumericFilters(),
            orderFilters: this.generateOrderFilters(),
        };
    }

    private generateSearchFilters(): string {
        return this.attributes
            .filter(attr => {
                return ['string', 'text'].includes(attr.doctrineType) ||
                    (isEntity(attr.doctrineType) && attr.cardinality);
            })
            .map(attr => `   '${attr.name}' => 'iexact'`)
            .join(',\n');
    }

    private generateDateFilters(): string {
        return this.attributes
            .filter(attr => attr.doctrineType === 'date')
            .map(attr => `   '${attr.name}'`)
            .join(',\n');
    }

    private generateNumericFilters(): string {
        return this.attributes
            .filter(attr => ['integer', 'smallint', 'bigint', 'decimal', 'float']
                .includes(attr.doctrineType))
            .map(attr => `   '${attr.name}'`)
            .join(',\n');
    }

    private generateOrderFilters(): string {
        return this.attributes
            .map(attr => `   '${attr.name}'`)
            .join(',\n');
    }
}

export function getFilterImports(attributes: EntityAttribute[]): string {
    return new FilterGenerator(attributes).getFilterImports();
}

export function getFilterAttributes(attributes: EntityAttribute[]): string {
    return new FilterGenerator(attributes).getFilterAttributes();
}