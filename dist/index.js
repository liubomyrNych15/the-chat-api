import Fastify from 'fastify';
import dotenv from 'dotenv';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';
import dbPlugin from './plugins/database';
import authPlugin from './plugins/auth';
import accountRoutes from './routes/account';
import messageRoutes from './routes/message';
dotenv.config();
const server = Fastify({ logger: true });
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
await server.register(accountRoutes, { prefix: '/account' });
await server.register(messageRoutes, { prefix: '/message' });
try {
    const port = Number(process.env.PORT) || 3000;
    await server.listen({ host: '0.0.0.0', port });
    server.log.info(`Server listening on port ${port}`);
}
catch (err) {
    server.log.error(err);
    process.exit(1);
}
