import type { FastifyInstance } from 'fastify';

import {
    createTextHandler,
    createFileHandler,
    listHandler,
    getContentHandler
} from '../controllers/messageController';

export default async function messageRoutes(fastify: FastifyInstance) {
    fastify.addHook('preHandler', fastify.basicAuth);

    fastify.post('/text', { handler: createTextHandler });
    fastify.post('/file', { handler: createFileHandler });
    fastify.get('/list', { handler: listHandler });
    fastify.get('/content', { handler: getContentHandler });
}