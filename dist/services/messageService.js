import fs from 'fs';
import path from 'path';
import { insertText, insertFile, listMessages, findMessageById } from '../models/message.js';
export async function createText(fastify, userId, text) {
    const { rows } = await fastify.pg.query(insertText, [userId, text]);
    return rows[0];
}
export async function createFile(fastify, userId, fileData) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir);
    const fileNameOnDisk = `${Date.now()}-${fileData.filename}`;
    const filePath = path.join(uploadDir, fileNameOnDisk);
    await new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(filePath);
        fileData.file.pipe(ws);
        ws.on('finish', resolve);
        ws.on('error', reject);
    });
    const { rows } = await fastify.pg.query(insertFile, [
        userId,
        fileData.filename,
        filePath,
        fileData.mimetype
    ]);
    return { ...rows[0], file_path: filePath };
}
export async function list(fastify, limit, offset) {
    const { rows } = await fastify.pg.query(listMessages, [limit, offset]);
    return rows;
}
export async function getContent(fastify, id) {
    const { rows } = await fastify.pg.query(findMessageById, [id]);
    return rows[0];
}
