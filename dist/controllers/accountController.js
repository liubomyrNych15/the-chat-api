import { register } from '../services/accountService';

export async function registerHandler(req, reply) {
    const { username, password } = req.body;
    if (!username || !password) {
        return reply.code(400).send({ error: 'username and password required' });
    }
    try {
        const user = await register(req.server, username, password);
        reply.code(201).send({ id: user.id, username: user.username });
    }
    catch (err) {
        if (err.code === '23505') {
            reply.code(409).send({ error: 'username already exists' });
        }
        else {
            throw err;
        }
    }
}
