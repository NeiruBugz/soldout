FROM node:13-alpine3.10

WORKDIR /server

# Bundle app source
COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000
