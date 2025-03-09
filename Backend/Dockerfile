FROM node:latest

WORKDIR ~/apps/running

COPY ../ProjectBalance/Project-Balance-2/Backend/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]