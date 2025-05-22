import type { FastifyInstance } from 'fastify';

import { registerHandler } from '../controllers/accountController';

export default async function accountRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/register',
        {
        schema: {
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: { id: { type: 'integer' }, username: { type: 'string' } }
                }
            }
        }
        },
        registerHandler
    );
}