FROM node:lts-alpine

WORKDIR /app

COPY ./package.json /app/

COPY .env /app/

RUN yarn --ignore-engines

COPY . /app/

CMD ["yarn", "run", "start:dev"]
