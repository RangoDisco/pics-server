FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY ./ ./

RUN yarn run build

EXPOSE 4000

USER node

CMD ["yarn", "start:prod"]
