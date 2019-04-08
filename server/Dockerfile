FROM node:10.5

WORKDIR /home

# Bundle app source
COPY . /home

# Install app dependencies
#RUN npm install -g nodemon
# If you are building your code for production
# RUN npm install --only=production
RUN npm i -g @nestjs/cli
RUN npm install

EXPOSE 3000
