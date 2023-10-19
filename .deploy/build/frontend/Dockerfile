FROM node:18.18.0-alpine3.18

WORKDIR /app
COPY package*.json .

RUN set -eux; \
    apk update; \
    apk upgrade --no-cache; \
    apk add --no-cache bash; \
    npm install --save-dev;

ENTRYPOINT [ "npm", "start" ]