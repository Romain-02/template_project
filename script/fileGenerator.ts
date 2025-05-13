import {Entity, xmlToEntities} from "./xmlToEntities";
import * as fs from 'fs-extra';
import * as path from 'path';
import {generateEntity} from "./entity/generateEntityPhpWithTables";
import {capitalize} from "./utils";
import {generateEntityFixtures} from "./fixtures/generateFixtures";
import {generateRepository} from "./repository/generateRepositories";
import {generateType} from "./typeScriptType/generateTypes";

export const ROOT = "./"

const SRC_PATH = ROOT + "src/"

const FRONT_TYPE_PATH = ROOT + "assets/react/types/api"

async function generateFiles(xmlPath: string,  srcPath: string){
    const entities: Entity[] = await xmlToEntities(xmlPath);
    await fs.ensureDir(srcPath);

    await generateSymfonyEntities(entities, srcPath);
    await generateSymfonyFixtures(entities, srcPath);
    await generateSymfonyRepositories(entities, srcPath);
    await generateFrontTypes(entities, FRONT_TYPE_PATH)
}

async function generateSymfonyEntities(entities: Entity[], srcPath: string) {
    for (const entity of entityWithoutUser(entities)) {
        const phpCode = generateEntity(entity, entities);
        const filePath = path.join(srcPath, "Entity", `${capitalize(entity.name)}.php`);

        await writeFileRecursive(filePath, phpCode);
        console.log(`✔ Entité générée : ${filePath}`);
    }
}

async function generateSymfonyRepositories(entities: Entity[], srcPath: string) {
    for (const entity of entityWithoutUser(entities)) {
        const phpCode = generateRepository(entity);
        const filePath = path.join(srcPath, "Repository", `${capitalize(entity.name)}Repository.php`);

        await writeFileRecursive(filePath, phpCode);
        console.log(`✔ Repository généré : ${filePath}`);
    }
}

async function generateSymfonyFixtures(entities: Entity[], srcPath: string) {
    for (const entity of entityWithoutUser(entities)) {
        const phpCode = generateEntityFixtures(entity);
        const filePath = path.join(srcPath, "DataFixtures", `${capitalize(entity.name)}Fixtures.php`);

        await writeFileRecursive(filePath, phpCode);
        console.log(`✔ Fixtures générées : ${filePath}`);
    }
}

async function generateFrontTypes(entities: Entity[], srcPath: string) {
    for (const entity of entityWithoutUser(entities)) {
        const phpCode = generateType(entity);
        const entityName = capitalize(entity.name);
        const filePath = path.join(srcPath, `${entityName}/${entityName}.ts`);

        await writeFileRecursive(filePath, phpCode);
        console.log(`✔ Types générées : ${filePath}`);
    }
}

async function writeFileRecursive(pathFile: string, phpCode: string) {
    const directory = path.dirname(pathFile);
    try {
        await fs.mkdirp(directory); // Crée récursivement le dossier
        await fs.writeFile(pathFile, phpCode, 'utf8');
    } catch (err) {
        console.error(`❌ Erreur lors de l’écriture du fichier ${pathFile}:`, err);
    }
}

function entityWithoutUser(entities: Entity[]){
    return entities.filter((entity) => entity.name !== "_user")
}

const args = process.argv.slice(2)

const xml_path = "./" + args[0];

generateFiles(xml_path, SRC_PATH).then()
