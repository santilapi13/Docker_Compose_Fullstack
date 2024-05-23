import express from 'express';
import cors from 'cors';
import utils from './utils/utils.js';
import { dataService } from './services/data.service.js';
import { addLogger } from './utils/logger.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(addLogger);

setInterval(utils.loadRandomData, 5000);

app.get('/api/data', async (req, res) => {
    try {
        const data = await dataService.getAll();
        res.json(data);
    } catch (error) {
        req.logger.error("Error fetching all items: " + error.message);
        res.status(500).send({ error: error.message });
    }
});

app.post('/api/data', async (req, res) => {
    try {
        const { data } = req.body;
        const result = await dataService.create(data);
        res.json(result);
    } catch (error) {
        req.logger.error("Error creating item: " + error.message);
        res.status(500).send({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})