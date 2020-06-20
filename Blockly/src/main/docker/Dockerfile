FROM java:8
#FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD target/Blockly-0.0.1-SNAPSHOT.jar spring-boot-docker.jar
EXPOSE 8080
RUN sh -c 'touch /spring-boot-docker.jar'
ENV JAVA_OPTS=""
ENTRYPOINT ["java", "-jar", "/spring-boot-docker.jar"]