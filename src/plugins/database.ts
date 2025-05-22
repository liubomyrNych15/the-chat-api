import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

const dbPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.register(import('@fastify/postgres'), {
        connectionString: process.env.DATABASE_URL
    });
};

export default fp(dbPlugin);