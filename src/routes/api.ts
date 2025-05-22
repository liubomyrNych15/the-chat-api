import type { FastifyPluginAsync } from 'fastify';

import accountRoutes from './account';
import messageRoutes from './message';

const api: FastifyPluginAsync = async (fastify) => {
  await fastify.register(accountRoutes, { prefix: '/account' });
  await fastify.register(messageRoutes, { prefix: '/message' });
};

export default api;