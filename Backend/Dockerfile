FROM node:latest

WORKDIR /app

COPY Project-Balance-2/Backend/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]