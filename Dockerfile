FROM node:lts-alpine

WORKDIR /app

COPY ./package.json /app/

RUN yarn --ignore-engines

COPY . /app/

RUN yarn run build

EXPOSE 4000

CMD ["yarn", "run", "start:prod"]
