# Stage 1 - Create a dev container
#FROM maven:3.6-jdk-10-slim as dev
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#COPY pom.xml /usr/src/app
#RUN mvn dependency:go-offline

# Stage 2 - Create a builder container
FROM maven:3.6-jdk-10-slim as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY src /usr/src/app/src
COPY pom.xml /usr/src/app

RUN mvn clean install -DskipTests

# Stage 2 - Create a downsized production container
FROM openjdk:10-jre-slim as prod
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/target/api-*.jar /usr/src/app/api.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom","-jar", "./api.jar"]

#Example code for building a container with pre-build fat jar
#FROM openjdk:8-jre-alpine3.7
#VOLUME /tmp
#ARG JAR_FILE=target/auth-0.0.1-SNAPSHOT.jar
#ADD ${JAR_FILE} auth-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/auth-0.0.1-SNAPSHOT.jar"]