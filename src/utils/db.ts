import dotenv from 'dotenv';
import {Client} from 'pg';

dotenv.config();

function connectDB() {
    
        var client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASS,
            port: Number(process.env.DB_PORT)
        });
        client.connect();

    return client;
}

export default connectDB();