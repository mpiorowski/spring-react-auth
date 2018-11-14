# Simple jwt authorization app with spring-boot, react and postgresql

Simple application with seperate frontend and backend, connected to postgresql database. Authorization via jwt tokens. Offers a simple ui to manage users and simple products data.

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

## via Docker

### prod
This one line creates a production ready downsized containers. After the automatic startup, which may take a while, the application is ready to work.
```
docker-compose -f docker-compose.prod.yml up -d --build
```
Access via http://localhost

### dev
Creates a more "fat" containers, which are ready for develompment (live code reloading).
```
docker-compose -f docker-compose.dev.yml up -d --build
```
Access via http://localhost:3000

## Manually

### database
Postgresql (configuration in application.yml):  
port:   5432  
scheme: auth  
user:   admin  
pass:   admin  

or You can use docker-compose to setup simple database container
```
docker-compose -f docker-compose.database.yml up -d --build
```

### prod
Run two seperate shell windows for frontend and backend.
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
Run two seperate shell windows for frontend and backend.
```
npm --prefix ./ui start
```
```
mvn -f ./api spring-boot:run
```
Access via http://localhost:3000
