FROM node:20.14.0-alpine3.20
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
COPY ./db.json .

EXPOSE 3000
RUN npx json-server --port 3002
# CMD ["npx", "json-server", "db.json", "--port", "3002"]
CMD ["npm", "start"]