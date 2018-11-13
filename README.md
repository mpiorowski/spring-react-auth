# stateless-auth with react and spring-boot

Simple application with seperate frontend and backend. Authorization via jwt tokens. Allows managment of users and simple products.

Frontend  -> react + antd + babel  
Backend   -> spring boot + flyway + mybatis + postgresql

# Instalation

## using Docker

### prod
Prerequisite:
docker

Create downsized production ready containers.  
```
docker-compose -f docker-compose.prod.yml up -d --build
```
Access via http://localhost

### dev
Install required dependencies.
```
mvn -f ./api clean compile
npm --prefix ./ui install ./ui
```
Create docker containers.
```
docker-compose -f docker-compose.dev.yml up -d --build
```
Access via http://localhost:3000

## Manually

Prerequisite:
java8, maven, npm, postgres, docker (optional)

### database config
Postgresql (configuration in application.yml):  
port:   5436  
scheme: auth  
user:   admin  
pass:   admin  
```
cd docker/
docker-compose up --build -d
```
### manual


## Backend
```
cd auth-stateless/ 
```
### dev
```
mvn spring-boot:run
```
### prod
```
mvn clean install && java -jar target/auth-0.0.1-SNAPSHOT.jar
```

## Frontend
```
cd ui-stateless/ 
npm install
```
### dev
```
npm start
```
### prod
```
npm install -g serve
npm run build
serve -s build
```

## Access
via http://localhost:3000 (dev) or http://localhost:5000 (prod)  
username: mat  
password: pass  
