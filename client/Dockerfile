FROM node:13-alpine3.10

# set working directory
WORKDIR /client

# install and cache app dependencies
COPY . .

RUN yarn
CMD yarn build
