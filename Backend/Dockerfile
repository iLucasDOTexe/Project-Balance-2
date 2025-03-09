FROM node:latest

WORKDIR ~/apps/

COPY ./ProjectBalance/Project-Balance-2/Backend/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]