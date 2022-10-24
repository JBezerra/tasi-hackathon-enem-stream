FROM node:14.5-alpine
WORKDIR /client
COPY package.json yarn.lock ./
RUN yarn
COPY . .
CMD yarn start
