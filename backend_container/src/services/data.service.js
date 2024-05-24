import PouchDB from 'pouchdb';

const DB_URL = 'http://localhost:5984/data';
const COUCH_USER = 'admin';
const COUCH_PASS = 'admin';

const db = new PouchDB(DB_URL, {
    auto_compaction: true,
    auth: { username: COUCH_USER, password: COUCH_PASS }
})
console.log("Connected to database");

class DataService {
    contructor() {}

    async getAll() {
        try {
            // const result = await db.allDocs({ include_docs: true });
            // const data = result.rows.map(row => row.doc);
            const data = [1, 2, 3, 4, 5, 6];
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