# Codecamp

A learning management system application where learners can submit an assignment and reviewers can claim and review
each submission.

## Technology Stack
#### Frontend:  `React.JS, Bootstrap`
#### Backend API: `Spring Boot, Spring Data JPA with Hibernate and the Postgress Driver`
#### Security and Auth: `Spring Security using JWT for user persistence`
#### Database: `PostgreSQL server for a relational database`

## Run this application on development mode:
## Backend
- The backend application runs by default on port 8080.
- Create an `application-dev.properties` file and add the information below into that new properties file.
- The [docker-compose.yml](codecamp_backend%2Fdocker-compose.yml) file is in the codecamp_backend repository.
- Once created, run the docker compose command to get the postgreSQL image. The pgadmin image is optional.
    - https://docs.docker.com/reference/cli/docker/compose/up/

### application-dev.properties file:
        ## postgresql properties
            spring.datasource.url=jdbc:postgresql://localhost:5550/codecampDB
            spring.datasource.username=codecamp123
            spring.datasource.password=codecamp123P
            spring.jpa.show-sql=true
        
        ## Hibernate Properties
            spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

        ## Hibernate ddl auto (create, create-drop, validate, update)
            spring.jpa.hibernate.ddl-auto=update

### To access database from the cli:
Database as a Docker container:
```shell
  docker exec -it codecamp_db_01 psql -U codecamp123 -d codecampDB
```

Database Local:
```shell
  psql -U codecamp123 -d codecampDB
```


### Frontend
- To start the React.js application, run in the cli `npm run dev` for development.
    - https://docs.npmjs.com/cli/v10/commands/npm-install

#### complete:
- Homepage
- Login
- Learner registration page
- Learner's pages
    - view all (_Submitted, In review, Needs work, Completed_)
    - Create assignment
    - edit and view buttons on cards

#### Partially complete:
- Request one on one (_Accessible, not submitting any changes_)
- Profile (_Accessible, not submitting any changes_)
- Register (_Accessible, not submitting any changes_)

#### offline:
- Inbox
- Calendar
- Reminders
- Settings
- Reviewer's pages

## N.B.
- This application is still under construction.
  - Create reviewer is not yet setup on the frontend side. At the moment, curl commands or applications like postman can be used
  to create reviewers.