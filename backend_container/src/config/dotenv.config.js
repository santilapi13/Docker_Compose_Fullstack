import dotenv from 'dotenv';

dotenv.config({ path: '.env', override: true });

export const config = {
    DB_URL : process.env.DB_URL,
    COUCH_USER : process.env.COUCH_USER,
    COUCH_PASS : process.env.COUCH_PASS,
}