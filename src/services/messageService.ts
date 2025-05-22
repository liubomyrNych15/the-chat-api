import fs from 'fs';
import path from 'path';
import type { FastifyInstance } from 'fastify';

import {
  insertText,
  insertFile,
  listMessages,
  findMessageById
} from '../models/message';

interface FileData {
    filename: string;
    mimetype: string;
    file: NodeJS.ReadableStream;
}

export async function createText(
    fastify: FastifyInstance,
    userId: number,
    text: string
) {
    const { rows } = await fastify.pg.query(insertText, [userId, text]);
    return rows[0];
}

export async function createFile(
    fastify: FastifyInstance,
    userId: number,
    fileData: FileData
) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const fileNameOnDisk = `${Date.now()}-${fileData.filename}`;
    const filePath = path.join(uploadDir, fileNameOnDisk);

    await new Promise<void>((resolve, reject) => {
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

export async function list(
    fastify: FastifyInstance,
    limit: number,
    offset: number
) {
    const { rows } = await fastify.pg.query(listMessages, [limit, offset]);
    return rows;
}

export async function getContent(
    fastify: FastifyInstance,
    id: number
) {
    const { rows } = await fastify.pg.query(findMessageById, [id]);
    return rows[0];
}
