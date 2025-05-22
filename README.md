   **The Chat API - README**

***Overview***
--------
A simple and modern REST API for a unified chat, built with Node.js, Fastify, PostgreSQL, and TypeScript.


***Key Features***
------------
- **User Management**: Register with username & password (hashed securely).
- **Authentication**: Basic Auth for protected routes.
- **Messaging**:
  - Send **text** messages.
  - Send **file** messages (stored in `uploads/`).
- **Message Retrieval**:
  - Paginated list of messages.
  - Raw content access (text or file stream).
- **Documentation**: OpenAPI (Swagger UI) available at `/docs`.


***Tech Stack***
----------
- **Runtime**: Node.js v18+
- **Framework**: Fastify
- **Language**: TypeScript (ESNext modules)
- **Database**: PostgreSQL 16
- **Dependency Management**: npm
- **Containerization**: Docker & Docker Compose
- **API Docs**: @fastify/swagger, Swagger UI


***Prerequisites***
-------------
- Docker & Docker Compose
- Node.js >= 18
- npm


***Getting Started***
---------------
1. **Clone repository**:
```bash
   git clone https://github.com/liubomyrNych15/the-chat-api.git
   cd fastify-chat-api
   ```

2. **Copy environment variables**:
```bash
   cp .env.example .env
   ```

3. **Launch services:**:
```bash
   docker-compose up -d
   ```

4. **Install dependencies:**:
```bash
   npm install
   ```

5. **Run in development mode:**:
```bash
   npm run dev
   ```


***Production Build***
---------------
```bash
   npm run build
   npm start
   ```


***Environment Variables***
---------------
- DATABASE_URL - PostgreSQL connection string.

- PORT - HTTP server port.

- BCRYPT_SALT_ROUNDS - Number of bcrypt salt rounds.


***Project Structure***
---------------
```bash
.
├── src
│   ├── controllers
│   ├── models
│   ├── plugins
│   ├── routes
│   ├── services
│   └── utils
├── migrations
├── uploads
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json
   ```


***API Endpoints***
---------------
- POST /account/register - Register a new user.
- POST /message/text - Send a text message.
- POST /message/file - Send a file message (multipart).
- GET /message/list - Get paginated messages.
- GET /message/content - Get raw content (text or file).


***Contributing***
---------------
Contributions are welcome! Please open issues or submit pull requests.


***License***
---------------
MIT © Liubomyr Nych
