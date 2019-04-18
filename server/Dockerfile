FROM node:10.5-alpine

WORKDIR /server

# Bundle app source
COPY . /server

RUN npm i -g @nestjs/cli
RUN npm install

EXPOSE 3000
