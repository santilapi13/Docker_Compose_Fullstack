import { dataService } from '../services/data.service.js';
import { logger } from './logger.js';

async function loadRandomData() {
    const data = {
        value: Math.floor(Math.random() * 100)
    }
    try {
        const result = await dataService.create(data);
        return result;
    } catch (error) {
        logger.error("Error loading random data: " + error.message);
    }
}


export default { loadRandomData };