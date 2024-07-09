import PouchDB from 'pouchdb';
import { config } from '../config/dotenv.config.js';

const DB_URL = config.DB_URL;
const COUCH_USER = config.COUCH_USER;
const COUCH_PASS = config.COUCH_PASS;

const db = new PouchDB(DB_URL, {
    auto_compaction: true,
    auth: { username: COUCH_USER, password: COUCH_PASS }
})
console.log("Connected to database");

class DataService {
    contructor() {}

    async getAll() {
        try {
            const result = await db.allDocs({ include_docs: true });
            const data = result.rows.map(row => row.doc);
            return data;
        } catch (error) {
            throw new Error("Error fetching all items: " + error);
        }
    }

    async create(data) {
        try {
            const result = await db.put({
                _id: new Date().toISOString(),
                data
            });
            return result;
        } catch (error) {
            throw new Error("Error creating item: " + error);
        }
    }
}

export const dataService = new DataService();