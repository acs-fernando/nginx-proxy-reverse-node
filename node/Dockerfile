FROM node:15

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install && npm install express && \
    npm install mysql && \
    npm install node-random-name

COPY . .

EXPOSE 3000

CMD ["node","index.js"]