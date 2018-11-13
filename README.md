# stateless-auth with react and spring-boot

Simple application with seperate frontend and backend. Authorization via jwt tokens. Allows managment of users and simple products.

Frontend  -> react + antd + babel  
Backend   -> spring boot + flyway + mybatis + postgresql

## Basic access
via http://localhost:3000 (dev) or http://localhost:5000 (prod)  
username: mat  
password: pass  

# Instalation

## Dependencies
Install required dependencies (not needed for production instalation via docker)
```
mvn -f ./api clean compile
npm --prefix ./ui install ./ui
```

## using Docker

### prod
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

### database config
Postgresql (configuration in application.yml):  
port:   5436  
scheme: auth  
user:   admin  
pass:   admin  

or You can use docker-compose to setup simple database container
```
docker-compose -f docker-compose.database.yml up -d --build
```

### prod
```
mvn -f ./api clean install && java -jar target/auth-0.0.1-SNAPSHOT.jar
```
```
npm --prefix ./ui run build
npm install -g serve
serve -s ./ui/build
```
Access via http://localhost:5000
### dev
```
npm --prefix ./ui start
```
```
mvn -f ./api spring-boot:run
```
Access via http://localhost:3000
