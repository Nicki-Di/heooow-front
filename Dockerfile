FROM node:16.15-alpine3.16

WORKDIR /app
COPY package*.json ./
RUN npm install -f
COPY . .
RUN npm run build
EXPOSE 80

CMD ["npm", "start"]
