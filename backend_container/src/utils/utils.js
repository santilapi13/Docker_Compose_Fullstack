import { dataService } from '../services/data.service.js';
import { logger } from './logger.js';
import { promises as fs } from 'fs';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadRandomData() {
    try {
        const data = await fs.readFile(__dirname + '/personajes.json', 'utf8');
        const jsonData = JSON.parse(data);
        const randomIndex = Math.floor(Math.random() * jsonData.length);
        const result = await dataService.create(jsonData[randomIndex]);
        return result;
    } catch (error) {
        logger.error("Error loading random data: " + error.message);
    }
}


export default { loadRandomData, __dirname } ;