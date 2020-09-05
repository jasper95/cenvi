# base image
FROM node:12.2.0-alpine

# install git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn
RUN npm i react-scripts@3.3.0 -g