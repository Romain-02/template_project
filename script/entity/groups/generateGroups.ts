import { Entity } from "../../xmlToEntities";
import { uncapitalize } from "../../utils";

export function getSerializationGroups(entityName: string, allEntities: Entity[]): string {
    const visited = new Set<string>();
    const serilizationGroups: string[] = collectSerializationGroups(entityName, allEntities, visited);
    const groupsString = serilizationGroups.map(group => `'${group}'`).join(', ');
    return `    #[Groups([${groupsString}])]\n`;
}

function collectSerializationGroups(entityName: string, allEntities: Entity[], visited: Set<string>): string[] {
    if (visited.has(entityName)) return [];
    visited.add(entityName);

    const baseGroup = uncapitalize(entityName);
    const groups = [`${baseGroup}:read`, `${baseGroup}:write`];

    const relatedEntities = findReferencingEntities(entityName, allEntities);
    for (const related of relatedEntities) {
        groups.push(...collectSerializationGroups(related.name, allEntities, visited));
    }

    return groups;
}

export function findReferencingEntities(entityName: string, allEntities: Entity[]): Entity[] {
    return allEntities.filter((entity) =>
        entity.attributes.some((attr) =>
            attr.phpType === entityName && attr.cardinality === "ManyToOne"
        )
    );
}