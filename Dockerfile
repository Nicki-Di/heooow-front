FROM node:16.15-alpine3.16

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000 

CMD ["npm", "start"]