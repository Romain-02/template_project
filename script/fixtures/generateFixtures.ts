import {Entity, EntityAttribute} from "../xmlToEntities";
import {capitalize, isEntity, uncapitalize} from "../utils";

const NB_ENTITY_CREATED = 10;

export function generateEntityFixtures(entity: Entity): string{
    const typeEntity = capitalize(entity.name)
    const newEntity = `new${typeEntity}`
    const repositories = getRepositories(entity);
    const hasToImportRepositories = repositories !== '';
    const dependencies = getDependencies(entity);
    const hasToDependencies = dependencies !== '';

    return `<?php

namespace App\\DataFixtures;

use Faker\\Factory;
use Doctrine\\Bundle\\FixturesBundle\\Fixture;
use App\\Entity\\${typeEntity};
${hasToImportRepositories ? getRepositoryImports(entity) : ''}
use Doctrine\\Persistence\\ObjectManager;

class ${typeEntity}Fixtures extends Fixture${hasToDependencies ? " implements DependentFixtureInterface" : ""}
{
    ${hasToImportRepositories ? `public function __construct(
        ${repositories}){}
        `: ''}
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        
        for($i = 0; $i < ${NB_ENTITY_CREATED}; $i++){
            ${getRelatedEntities(entity)}
            $${newEntity} = (new ${typeEntity}())
                ${getSetters(entity)};
            $manager->persist($${newEntity});
        }
        
        $manager->flush();
    }
    ${dependencies}
}`
}

function getSetters(entity: Entity): string{
    const attributesToFill = entity.attributes.filter((attribute) =>
        attribute.name !== "id" && attribute.cardinality !== "OneToMany");
    return attributesToFill.map((attribute) =>
        `->set${capitalize(attribute.name)}(${generateAttributeValue(attribute)})`
    ).join('\n              ')
}

function generateAttributeValue(attribute: EntityAttribute): any{
    switch (attribute.doctrineType){
        case 'integer':
            return '$faker->randomNumber(4)'
        case 'float':
        case 'decimal':
            return '$faker->randomFloat(4)'
        case 'text':
            return '$faker->sentence(8)'
        case 'string':
            return '$faker->word()'
        case 'boolean':
            return '$faker->boolean()'
        case 'date':
            return '$faker->dateTimeBetween("-1 year")'
        case 'array':
        case 'json':
            return '[]'
        default:
            return `$${attribute.name}`
    }
}

function getRelatedEntities(entity: Entity){
    const relatedAttributes = entity.attributes.filter((attribute) =>
        isEntity(attribute.doctrineType) && attribute.cardinality !== "OneToMany")

    if(relatedAttributes.length === 0){
        return '';
    }

    return ' ' + relatedAttributes.map((relatedAttribute) => {
        const attribute: string = uncapitalize(relatedAttribute.name)
        return `$${attribute} = $this->${attribute}Repository->getRandomElement();`;
    }).join('\n             ') + '\n'
}

function getRepositoryImports(entity: Entity): string {
    return entity.attributes
        .filter(attribute => isEntity(attribute.doctrineType))
        .map(attribute => `use App\\Repository\\${capitalize(attribute.phpType)}Repository;`)
        .join('\n') + 'use Doctrine\\Common\\DataFixtures\\DependentFixtureInterface;\n';
}

function getRepositories(entity: Entity): string {
    return entity.attributes
        .filter(attribute => isEntity(attribute.doctrineType) && attribute.cardinality !== "OneToMany")
        .map(attribute => {
            const repoName = `${uncapitalize(attribute.phpType)}Repository`;
            return `private ${capitalize(attribute.phpType)}Repository $${repoName}`;
        })
        .join(',\n        ');
}

function getDependencies(entity: Entity){
    const dependencies: EntityAttribute[] = entity.attributes
        .filter(attribute => isEntity(attribute.doctrineType) && attribute.cardinality !== "OneToMany")

    if(dependencies.length === 0){
        return ''
    }

    return `
        public function getDependencies(): array
        {
            return [
                ${dependencies.map((dependency) => 
        `${dependency.phpType}Fixtures::class`
    ).join(',\n                 ')}
            ];
        }`
}