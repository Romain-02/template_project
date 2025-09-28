import {Entity, EntityAttribute} from "./xmlToEntities";

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function uncapitalize(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function removeProblematicChars(str: string): string {
    return removeLengthFromVarchar(removeNumberFromDecimal(str));
}

export function pluralizeIfNeeded(name: string): string {
    return name.endsWith("s") ? name : name + "s";
}

export function getNumberFromEntityName(columnName: string): string {
    const number: number = Number(columnName.charAt(columnName.length - 1));
    if(isNaN(number)){
        return "0"
    }
    return number + ""
}

export function isEntity(columnName: string): boolean {
    return !doctrineTypes.includes(columnName);
}

function removeLengthFromVarchar(str: string): string {
    if(str.indexOf("VARCHAR") === -1){
        return str;
    }
    return "VARCHAR"
}

function removeNumberFromDecimal(str: string): string {
    if(str.indexOf("DECIMAL") === -1){
        return str;
    }
    return "DECIMAL"
}

export function entityNameToDefaultName(entityName: string){
    const entityNameSnakeCase = toSnakeCase(entityName);
    return `DEFAULT_${entityNameSnakeCase.toUpperCase()}`
}

export function removeUnderscoreAtFirstChar(name: string){
    return name.startsWith('_') ? name.substring(1, name.length) : name
}

export function underscoreAtFirstCharNameToType(name: string){
    return capitalize(removeUnderscoreAtFirstChar(name))
}

export function isEntityNameEqualAttributeName(entity: Entity, entityAttribute: EntityAttribute){
    return entity.name.toUpperCase() === entityAttribute.name.toUpperCase() ||
        (entityAttribute.name.endsWith('s') && entityAttribute.name.substring(0, entityAttribute.name.length - 1))
}

export function toSnakeCase(input: string): string {
    return input.replace(/([A-Z])/g, (_, p1) => "_" + p1.toLowerCase()).replace(/^_/, '');
}

export function mapType(xmlType: string): { doctrineType: string; phpType: string; } {
    const baseType = removeProblematicChars(xmlType.toUpperCase());

    switch (baseType) {
        case 'INT':
        case 'INTEGER':
            return { doctrineType: 'integer', phpType: 'int'};
        case 'SMALLINT':
            return { doctrineType: 'smallint', phpType: 'int' };
        case 'BIGINT':
            return { doctrineType: 'bigint', phpType: 'int'};
        case 'TINYINT':
            return { doctrineType: 'boolean', phpType: 'bool'};
        case 'FLOAT':
            return { doctrineType: 'float', phpType: 'float'};
        case 'DOUBLE':
        case 'DECIMAL':
            return { doctrineType: 'decimal', phpType: 'float'};
        case 'CHAR':
        case 'VARCHAR':
            return { doctrineType: 'string', phpType: 'string'};
        case 'LONGTEXT':
        case 'MEDIUMTEXT':
        case 'TINYTEXT':
        case 'TEXT':
            return { doctrineType: 'text', phpType: 'string'};
        case 'DATE':
            return { doctrineType: 'date', phpType: '\\DateTimeInterface'};
        case 'TIME':
            return { doctrineType: 'time', phpType: '\\DateTimeInterface'};
        case 'DATETIME':
        case 'TIMESTAMP':
            return { doctrineType: 'datetime', phpType: '\\DateTimeInterface'};
        case 'BOOLEAN':
        case 'BOOL':
        case 'LOGICAL':
            return { doctrineType: 'boolean', phpType: 'bool'};
        case 'BLOB':
        case 'BINARY':
            return { doctrineType: 'blob', phpType: 'string'};
        case 'JSON':
            return { doctrineType: 'json', phpType: 'array'};
        case 'ARRAY':
            return { doctrineType: 'array', phpType: 'array'};
        default:
            return { doctrineType: '', phpType: xmlType === '_user' ? 'User' : xmlType};
    }
}

export function phpTypeToTypeScript(phpType: string, entityName: string = ""): string {
    switch (phpType.toLowerCase()) {
        case 'int':
        case 'integer':
        case 'float':
        case 'double':
            return 'number';
        case 'string':
            return 'string';
        case '\\datetimeinterface':
            return 'Date'
        case 'bool':
        case 'boolean':
            return 'boolean';
        case 'array':
            return `${capitalize(entityName)}[]`;
        case 'object':
            return 'Record<string, any>';
        case 'mixed':
            return 'any';
        case 'null':
            return 'null';
        case 'callable':
            return '(...args: any[]) => any';
        case 'void':
            return 'void';
        case 'iterable':
            return 'Iterable<any>';
        default:
            return phpType;
    }
}

export const doctrineTypes = [
    'integer',
    'smallint',
    'bigint',
    'string',
    'text',
    'datetime',
    'datetimetz',
    'date',
    'time',
    'decimal',
    'boolean',
    'binary',
    'blob',
    'float',
    'json',
    'array',
    'guid',
    'dateinterval',
    'object',
];