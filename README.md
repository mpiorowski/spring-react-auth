# ps-stateless-auth

Simple application with seperate frontend and backend. Authorization via jwt tokens. Allows managment of users and simple products.

Frontend  -> react + antd + babel  
Backend   -> spring boot + flyway + mybatis + postgresql

## Instalation

### Database
Postgresql (configuration in application.yml):  
port:   5436  
scheme: auth  
user:   admin  
pass:   admin  

### Backend
port 9000
```
cd auth-stateless/ 
```
dev
```
mvn spring-boot:run
```
prod
```
mvn clean install && java -jar target/auth-0.0.1-SNAPSHOT.jar
```

### Frontend
```
cd ui-stateless/ 
```
dev (port 3000)
```
npm start
```
prod
```
npm install -g serve
npm run build
serve -s build
```


