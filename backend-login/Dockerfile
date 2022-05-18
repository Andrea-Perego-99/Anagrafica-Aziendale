FROM maven as stage1
ENV MAVEN_OPTS="-XX:+TieredCompilation -XX:TieredStopAtLevel=1"
WORKDIR /usr/local/app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY ./src ./src
RUN mvn clean install -Dmaven.test.skip=true

FROM openjdk
WORKDIR /usr/local/app
COPY --from=stage1 /usr/local/app/target/login-registrazione-0.0.1-SNAPSHOT.jar /usr/local/app/login.jar
ENTRYPOINT ["java", "-jar", "login.jar"]