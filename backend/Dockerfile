FROM gradle:8.8-jdk21 AS build

WORKDIR /app

COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY libs ./libs
RUN gradle dependencies --no-daemon

COPY src ./src

RUN gradle jar --no-daemon

FROM openjdk:21

WORKDIR /app

COPY --from=build /app/build/libs/*.jar backend-1.0-SNAPSHOT.jar
COPY --from=build /app/libs ./libs

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-DFCGI_PORT=8080", "backend-1.0-SNAPSHOT.jar"]

