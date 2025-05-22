import { registerHandler } from '../controllers/accountController.js';
export default async function accountRoutes(fastify) {
    fastify.post('/register', {
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
    }, registerHandler);
}
