# Local MySQL for authapp

## Start DB with Docker

From `backend/authapp` run:

```bash
docker compose up -d
```

This will start a MySQL 8 container with:
- Database: `authdb`
- User: `appuser`
- Password: `apppass`
- Root password: `rootpass`

## Connect Spring Boot

`src/main/resources/application.properties` is set to:

```
spring.datasource.url=jdbc:mysql://localhost:3306/authdb
spring.datasource.username=appuser
spring.datasource.password=apppass
```

Start the Spring Boot app (from `backend/authapp`):

```bash
mvn spring-boot:run
```

If you prefer a local MySQL instance, update `application.properties` with your credentials.
