FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY ./ ./

RUN yarn run build

CMD ["yarn", "start:prod"]
