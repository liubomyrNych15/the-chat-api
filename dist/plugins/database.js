import fp from 'fastify-plugin';
const dbPlugin = async (fastify) => {
    fastify.register(import('@fastify/postgres'), {
        connectionString: process.env.DATABASE_URL
    });
};
export default fp(dbPlugin);
