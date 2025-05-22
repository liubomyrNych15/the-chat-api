import { createTextHandler, createFileHandler, listHandler, getContentHandler } from '../controllers/messageController.js';
export default async function messageRoutes(fastify) {
    fastify.addHook('preHandler', fastify.basicAuth);
    fastify.post('/text', { handler: createTextHandler });
    fastify.post('/file', { handler: createFileHandler });
    fastify.get('/list', { handler: listHandler });
    fastify.get('/content', { handler: getContentHandler });
}
