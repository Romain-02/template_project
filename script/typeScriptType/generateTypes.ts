import {Entity, EntityAttribute} from "../xmlToEntities";
import {
    capitalize,
    entityNameToDefaultName,
    isEntity, isEntityNameEqualAttributeName,
    phpTypeToTypeScript,
    uncapitalize
} from "../utils";

const TYPE_FOLDER_PATH = "@/types/api";

export function generateType(entity: Entity) {
    const typeImports: string = getTypeImports(entity.attributes)
    const type: string = capitalize(entity.name);
    const attributes: string = getAttributes(entity.attributes);
    const defaultType = getDefaultType(entity)
    const defaultName = entityNameToDefaultName(entity.name)

    return `${typeImports}export type ${type} = {
    ${attributes}
}

export type ${type}s = ${type}[];

export const ${defaultName} = {
    ${defaultType}
}
`
}

function getTypeImports(entityAttributes: EntityAttribute[]){
    const typesToImport: string[] = entityAttributes.filter((entityAttributes) =>
        isEntity(entityAttributes.doctrineType)).map((entityAttributes) => entityAttributes.phpType);
    const imports: string[] = typesToImport.map((typeToImport) =>
        `import {${typeToImport}, ${entityNameToDefaultName(typeToImport)}} from '${[TYPE_FOLDER_PATH, typeToImport, typeToImport].join("/")}'`)

    return imports.join("\n") + (typesToImport.length > 0 ? "\n\n" : "")
}

function getAttributes(entityAttributes: EntityAttribute[]){
    return entityAttributes.map((entityAttribute) =>
        `${entityAttribute.name}: ${phpTypeToTypeScript(entityAttribute.phpType, entityAttribute.name)}`
    ).join(",\n    ")
}

function getDefaultType(entity: Entity){
    return entity.attributes.map((entityAttribute) =>
        `${entityAttribute.name}: ${getDefaultValue(entityAttribute)}`)
        .join(',\n     ')
}

function getDefaultValue(entityAttribute: EntityAttribute){
    const tsType = phpTypeToTypeScript(entityAttribute.phpType);

    if(entityAttribute.phpType.toLowerCase() === "array"){
        return []
    }

    if(isEntity(entityAttribute.doctrineType)){
        return entityNameToDefaultName(entityAttribute.phpType)
    }

    switch(tsType){
        case 'number':
            return -1
        case 'string':
            return entityAttribute.doctrineType.toLowerCase() === "text"
                ? "'Ceci est une valeur par défault'" : "'defaut'";
        case 'bool':
            return false
        case 'Date':
            return Date.now()
    }
}