## base image
#FROM node:10.11.0 as builder
#
## set working directory
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#
## add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#
## install and cache app dependencies
#COPY package.json /usr/src/app/package.json
#RUN npm install
#
## start app
#CMD ["npm", "start"]

# Stage 1 - Create a builder container
FROM node:10.11.0 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY src /usr/src/app/src
COPY public /usr/src/app/public
COPY config-overrides.js /usr/src/app/config-overrides.js
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm run build

# Stage 2 - Create a downsized production container

FROM nginx:1.12-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

