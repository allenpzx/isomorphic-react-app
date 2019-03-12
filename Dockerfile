FROM node:10.3.0
ADD . /app
WORKDIR /app
CMD yarn start
EXPOSE 9000