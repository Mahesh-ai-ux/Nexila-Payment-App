FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3001
ENV MONGODB_URI=mongodb://mongodb:27017/appdb
ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "server.js"]
