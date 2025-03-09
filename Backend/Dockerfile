FROM node:latest

WORKDIR ~/apps/running

COPY ~/apps/ProjectBalance/Project-Balance-2/Backpackage*.json

RUN npm install

COPY . .

CMD ["npm", "start"]