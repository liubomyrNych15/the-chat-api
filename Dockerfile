FROM node:20

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN mkdir -p uploads

EXPOSE 3000
CMD ["node", "dist/index.js"]