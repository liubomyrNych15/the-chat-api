import type { FastifyRequest, FastifyReply } from 'fastify';

import { register } from '../services/accountService';

interface RegisterBody {
    username: string;
    password: string;
}

export async function registerHandler(
    req: FastifyRequest<{ Body: RegisterBody }>,
    reply: FastifyReply
) {
    const { username, password } = req.body;
    if (!username || !password) {
        return reply.code(400).send({ error: 'username and password required' });
    }
    try {
        const user = await register(req.server, username, password);
        reply.code(201).send({ id: user.id, username: user.username });
    } catch (err: any) {
        if (err.code === '23505') {
            reply.code(409).send({ error: 'username already exists' });
        } else {
            throw err;
        }
    }
}