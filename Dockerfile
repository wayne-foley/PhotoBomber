FROM node:alpine

COPY ./ /src
WORKDIR /src

EXPOSE  3000
CMD ["node", "server.js"]