FROM node:18-alpine3.14

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]