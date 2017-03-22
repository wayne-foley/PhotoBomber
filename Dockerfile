FROM node:alpine

COPY ./ /src
WORKDIR /src

RUN npm install

EXPOSE  3000
CMD ["node", "server.js"]