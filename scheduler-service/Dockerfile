FROM openjdk:11.0.3-jdk-slim-stretch

ADD ./target/scheduler-service-0.0.1-SNAPSHOT.jar /producer/app/scheduler-service-0.0.1-SNAPSHOT.jar

WORKDIR /producer/app

ENTRYPOINT ["java","-jar","scheduler-service-0.0.1-SNAPSHOT.jar"]