import dotenv from 'dotenv';
import express from 'express';
import { Pool } from 'pg';
import { v4 } from 'uuid';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

const connect = async () => {
    try {
        await pool.connect();
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
};

connect();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    const query = {
        text: `SELECT * FROM users`,
    };
    const records = await pool.query(query);
    res.status(200).json(records.rows);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});