import fp from 'fastify-plugin';
import type { FastifyPluginAsync, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';

declare module 'fastify' {
  interface FastifyInstance {
    verifyBasicAuth: (username: string, password: string, req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
declare module 'fastify' {
  interface FastifyRequest {
    user: { id: number; username: string };
  }
}

const authPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.decorate('verifyBasicAuth', async (username, password, req, reply) => {
        const { rows } = await fastify.pg.query(
            'SELECT id, password FROM users WHERE username = $1',
            [username]
        );
        if (rows.length === 0) {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }
        const user = rows[0];
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }
        req.user = { id: user.id, username };
    });

    fastify.register(import('@fastify/basic-auth'), {
        validate: fastify.verifyBasicAuth,
        authenticate: true
    });
};

export default fp(authPlugin);