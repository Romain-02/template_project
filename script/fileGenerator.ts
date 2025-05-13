import {Entity, xmlToEntities} from "./xmlToEntities";
import * as fs from 'fs-extra';
import * as path from 'path';
import {generateEntity} from "./entity/generateEntityPhpWithTables";
import {capitalize} from "./utils";
import {generateEntityFixtures} from "./fixtures/generateFixtures";
import {generateRepository} from "./repository/generateRepositories";

export const ROOT = "../"

const SRC_PATH = ROOT + "src/"

async function generateFiles(xmlPath: string,  srcPath: string){
    const entities: Entity[] = await xmlToEntities(xmlPath);
    await fs.ensureDir(srcPath);

    await generateSymfonyEntities(entities, srcPath);
    await generateSymfonyFixtures(entities, srcPath);
    await generateSymfonyRepositories(entities, srcPath);
}

async function generateSymfonyEntities(entities: Entity[], srcPath: string) {
    for (const entity of entities) {
        const phpCode = generateEntity(entity, entities);
        const filePath = path.join(srcPath, "Entity", `${capitalize(entity.name)}.php`);

        writeFileRecursive(filePath, phpCode);
        console.log(`✔ Entité générée : ${filePath}`);
    }
}

async function generateSymfonyRepositories(entities: Entity[], srcPath: string) {
    for (const entity of entities) {
        const phpCode = generateRepository(entity);
        const filePath = path.join(srcPath, "Repository", `${capitalize(entity.name)}Repository.php`);

        writeFileRecursive(filePath, phpCode);
        console.log(`✔ Repository généré : ${filePath}`);
    }
}

async function generateSymfonyFixtures(entities: Entity[], srcPath: string) {
    for (const entity of entities) {
        const phpCode = generateEntityFixtures(entity);
        const filePath = path.join(srcPath, "DataFixtures", `${capitalize(entity.name)}Fixtures.php`);

        writeFileRecursive(filePath, phpCode);
        console.log(`✔ Fixtures générées : ${filePath}`);
    }
}

function writeFileRecursive(pathFile: string, phpCode: string) {
    const directory = path.dirname(pathFile)
    fs.mkdir(directory, { recursive: true}, function (err) {
        if (err){
            console.log(err);
            return;
        }
        fs.writeFile(pathFile, phpCode, 'utf8');
    });
}

const args = process.argv.slice(2)

const xml_path = "./" + args[0];

generateFiles(xml_path, SRC_PATH).then()
