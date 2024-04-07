FROM node:19.5.0-alpine

COPY package*.json ./


WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
# CMD [ "sh", "-c", "npm run dev" ]
