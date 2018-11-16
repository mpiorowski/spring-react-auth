# Stage 1 - Create a builder container
FROM maven:3.6-jdk-10-slim as builder

RUN groupadd --system --gid 1000 test
RUN useradd --system --gid test --uid 1000 --shell /bin/bash --create-home test

USER test
WORKDIR /home/test
RUN mkdir /home/test/app
COPY src /home/test/app/src
COPY pom.xml /home/test/app

RUN mvn -f /home/test/app clean package

# Stage 2 - Create a downsized production container
FROM openjdk:10-jre-slim as prod

RUN groupadd --system --gid 1000 prod
RUN useradd --system --gid prod --uid 1000 --shell /bin/bash --create-home prod

USER prod
WORKDIR /home/prod

COPY --from=builder /home/test/app/target/api-*.jar /home/prod/app/api.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom","-jar", "/home/prod/app/api.jar"]

#Example code for building a container with pre-build fat jar
#FROM openjdk:8-jre-alpine3.7
#VOLUME /tmp
#ARG JAR_FILE=target/auth-0.0.1-SNAPSHOT.jar
#ADD ${JAR_FILE} auth-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/auth-0.0.1-SNAPSHOT.jar"]