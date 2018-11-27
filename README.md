# Simple jwt authorization app with spring-boot, react and postgresql

Simple application with separate frontend and backend, connected to postgresql database. Authorization via jwt tokens. Offers a basic ui to manage users and products data.

Frontend  -> react + antd + babel  
Backend   -> spring boot + flyway + mybatis + postgresql

## Basic access
via http://localhost:3000 (dev) or http://localhost:5000 (prod)  
username: mat  
password: pass  

# Installation

## Prerequisites and Dependencies
Prerequisites: node, npm, java, maven, docker

Install required dependencies (not needed for production instalation using docker)
```
mvn -f ./api clean dependency:resolve; \
npm --prefix ./ui install ./ui
```

## Docker instalation

### prod
This one line creates a production ready downsized containers. After the automatic startup, which may take a while, the application is ready to work.
```
docker-compose -f ./docker/docker-compose.prod.yml up -d --build
```
Access via http://localhost:5000

### dev
Creates a more "fat" containers, which are ready for develompment (live code reloading).
```
docker-compose -f ./docker/docker-compose.dev.yml up -d --build
```
Access via http://localhost:3000

## Manual instalation

### database
PostgreSQL (configuration in application.yml):  
port:   5432  
scheme: auth  
user:   admin  
pass:   admin  

or You can use docker-compose to setup simple database container
```
docker-compose -f ./docker/docker-compose.database.yml up -d --build
```

### dev
Run two separate shell windows for frontend and backend.
(Or just use your favorite IDE :) )
```
mvn -f ./api spring-boot:run
```
```
npm --prefix ./ui start
```
Access via http://localhost:3000

### prod
Run two separate shell windows for frontend and backend.
```
mvn -f ./api clean package; \ 
java -jar ./api/target/api-0.0.1-SNAPSHOT.jar
```
```
npm --prefix ./ui run build; \
npm install -g serve; \
serve -s ./ui/build
```
Access via http://localhost:5000
