import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import pool from '../database';
import { User, UserCredentials, UserPayload } from '../types/user';

dotenv.config();

const { CRYPT_PASSWORD: password, SALT_ROUNDS: saltRounds } = process.env;

export async function createUser(data: UserPayload): Promise<User> {
    try {
        const conn = await pool.connect();
        const hash = bcrypt.hashSync(
            `${data.password}${password}`,
            parseInt(saltRounds || '10')
        );
        const records = await pool.query({
            text: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            values: [data.name, data.email, hash],
        });
        conn.release();
        return records.rows[0];
    } catch (error) {
        throw new Error(`Cannot create user: ${error}`);
    }
}

export async function authenticate(cred: UserCredentials): Promise<User | null> {
    try {
        const conn = await pool.connect();
        const records = await pool.query({
            text: "SELECT * FROM users WHERE id=($1)",
            values: [cred.id],
        });
        conn.release();

        if (records.rows.length === 0) {
            return null;
        }

        const user = records.rows[0];
        const isValid = bcrypt.compareSync(
            `${cred.password}${password}`,
            user.password
        );

        if (isValid) {
            return user;
        }

        return null;
    } catch (error) {
        throw new Error(`Cannot authenticate user: ${error}`);
    }
}



