FROM node:alpine

COPY ./ /src
WORKDIR /src

RUN npm install -g browserify
RUN npm install
RUN browserify app.js -o ./public/main.js

EXPOSE  3000
CMD ["node", "server.js"]