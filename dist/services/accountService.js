import bcrypt from 'bcrypt';
import { createUser, findByUsername } from '../models/user.js';
export async function register(fastify, username, password) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashed = await bcrypt.hash(password, saltRounds);
    const { rows } = await fastify.pg.query(createUser, [username, hashed]);
    return rows[0];
}
export async function getUserByUsername(fastify, username) {
    const { rows } = await fastify.pg.query(findByUsername, [username]);
    return rows[0];
}
