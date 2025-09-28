import {generateEntity} from "./generateEntityPhpWithTables";
import {capitalize} from "../utils";
import {Entity, xmlToEntities} from "../xmlToEntities";
import * as fs from 'fs-extra';
import * as path from 'path';

async function generateSymfonyEntities(xmlFile: string, outputDir: string) {

    const entities: Entity[] = await xmlToEntities(xmlFile)
    await fs.ensureDir(outputDir);

    for (const entity of entities) {
        const phpCode = generateEntity(entity, entities);
        const filePath = path.join(outputDir, `${capitalize(entity.name)}.php`);

        await fs.writeFile(filePath, phpCode, 'utf8');
        console.log(`✔ Entité générée : ${filePath}`);
    }
}

// Utilisation
generateSymfonyEntities('../../Looping1.xml', '../../src/Entity').catch(console.error);