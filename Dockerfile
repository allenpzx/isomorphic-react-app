FROM node:10.3.0
MAINTAINER Zixiu
ADD . /app
WORKDIR /app
RUN npm install pm2 -g
RUN npm run prev
CMD npm run start
EXPOSE 9090