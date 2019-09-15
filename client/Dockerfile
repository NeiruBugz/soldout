FROM node:10.16.3-alpine

# set working directory
WORKDIR /client

# install and cache app dependencies
COPY . .

RUN yarn
RUN yarn build
