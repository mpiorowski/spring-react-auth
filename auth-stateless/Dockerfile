# Stage 1 - Create a builder container
FROM maven:3.6-jdk-10-slim as builder
RUN java -version

COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

# Stage 2 - Create a downsized production container
FROM openjdk:10-jre-slim
WORKDIR /usr/src/app/
COPY --from=builder /usr/src/app/target/auth-0.0.1-SNAPSHOT.jar /usr/src/app

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom","-jar", "./auth-0.0.1-SNAPSHOT.jar"]


#Example code for building a container with pre-build fat jar
#FROM openjdk:8-jre-alpine3.7
#VOLUME /tmp
#ARG JAR_FILE=target/auth-0.0.1-SNAPSHOT.jar
#ADD ${JAR_FILE} auth-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/auth-0.0.1-SNAPSHOT.jar"]