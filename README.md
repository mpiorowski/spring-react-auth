# ps-stateless-auth

Simple application with seperate frontend and backend. Authorization via jwt tokens. Allows managment of users and simple products.

Frontend  -> react + antd + babel  
Backend   -> spring boot + flyway + mybatis + postgresql

## Instalation

### Database (port 5436)

Postgresql (configuration in application.yml):  
scheme: auth  
user:   admin  
pass:   admin  

### Backend (port 9000)

#### via maven  
mvn clean isntall && java -jar target/auth-0.0.1-SNAPSHOT.jar
