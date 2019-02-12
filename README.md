# JWT authorization app with spring-boot, react and postgresql

Sample application with separate frontend and backend, connected to postgresql database. Authorization via jwt tokens. Offers a basic ui to manage users and products data.

Frontend  -> react + antd + babel  
Backend   -> spring boot + flyway + mybatis + postgresql

## Initial access
http://localhost:3000 (dev) or http://localhost (prod)  
username: user  
password: pass  

# Deployment

## Prerequisites and Dependencies
Prerequisites: node, npm, java, maven, docker, docker-compose

Dependencies (not needed for production installation using docker):
```
mvn -f ./api clean dependency:resolve; \
npm --prefix ./ui install ./ui
```

## Development deployment

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

### frontend and backend
Run two separate shell windows for frontend and backend.
(Or just use your favorite IDE :) )
```
mvn -f ./api spring-boot:run
```
```
npm --prefix ./ui start
```

Access via http://localhost:3000


## Production deployment using docker-compose

This one line creates a production ready downsized containers.  
Only docker and docker-compose are needed as prerequisites.  
After the automatic startup, which may take a while, the application is ready to work.  
```
docker-compose -f ./docker/docker-compose.prod.yml up -d --build
```
Access via http://localhost


## Production manual deployment

Database need to be manually setup up as in application.yml config file.  
Server proxy need to be set for frontend url to backed port:  
localhost/api/ - localhost:9000/api/

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
Access via http://localhost

# Swagger
For the development build there is an active swagger component for api documentation.  
Access via ui link or by entering http://localhost:9000/swagger-ui.html.  
You need to authorized it by clicking "Authorize" button and then passing your jwt token as: "Bearer your_jwt_token".
