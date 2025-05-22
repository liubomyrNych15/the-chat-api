import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';

import dbPlugin from './plugins/database';
import authPlugin from './plugins/auth';
import api from './routes/api';

dotenv.config();

async function buildServer(): Promise<FastifyInstance> {
  const server: FastifyInstance = Fastify({ logger: true });

  await server.register(dbPlugin);
  await server.register(authPlugin);

  await server.register(swagger, {
    swagger: {
      info: { title: 'Chat API', version: '1.0.0' }
    }
  });
  await server.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'full' }
  });

  await server.register(multipart);
  await server.register(api, { prefix: '/api' });

  return server;
}

(async () => {
  try {
    const server = await buildServer();
    const port = Number(process.env.PORT) || 3000;
    await server.listen({ host: '0.0.0.0', port });
    server.log.info(`Server listening on port ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();