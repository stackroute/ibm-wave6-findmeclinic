FROM openjdk:11.0.3-jdk-slim-stretch

ADD ./target/authentication-service-0.0.1-SNAPSHOT.jar  /consumer/app/authentication-service-0.0.1-SNAPSHOT.jar

WORKDIR /consumer/app

ENTRYPOINT ["java","-jar","authentication-service-0.0.1-SNAPSHOT.jar"]