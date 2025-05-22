import fs from 'fs';
import * as messageService from '../services/messageService.js';
import { getPagination } from '../utils/pagination.js';
export async function createTextHandler(req, reply) {
    const { text } = req.body;
    if (!text)
        return reply.code(400).send({ error: 'text required' });
    const msg = await messageService.createText(req.server, req.user.id, text);
    reply.code(201).send(msg);
}
export async function createFileHandler(req, reply) {
    const data = await req.file();
    if (!data) {
        return reply.code(400).send({ error: 'File is required' });
    }
    const msg = await messageService.createFile(req.server, req.user.id, {
        filename: data.filename,
        mimetype: data.mimetype,
        file: data.file
    });
    reply.code(201).send(msg);
}
export async function listHandler(req, reply) {
    const { limit, offset } = getPagination(req.query);
    const msgs = await messageService.list(req.server, limit, offset);
    reply.send({ messages: msgs });
}
export async function getContentHandler(req, reply) {
    const idParam = req.query.id;
    if (!idParam)
        return reply.code(400).send({ error: 'id required' });
    const id = parseInt(idParam, 10);
    const msg = await messageService.getContent(req.server, id);
    if (!msg)
        return reply.code(404).send({ error: 'not found' });
    if (msg.type === 'text') {
        reply.header('Content-Type', 'text/plain').send(msg.text_content);
    }
    else {
        reply
            .header('Content-Type', msg.mime_type)
            .send(fs.createReadStream(msg.file_path));
    }
}
