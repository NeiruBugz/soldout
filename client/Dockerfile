FROM node:10.5-alpine

# set working directory
WORKDIR /client

# install and cache app dependencies
COPY . .
RUN yarn

RUN yarn build
