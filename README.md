# Codecamp

A learning management system application where learners can submit an assignment and reviewers can claim and review 
each submission.

## Technology Stack
- **Frontend:** React JS
- **Backend API:** Spring Boot with Spring Data JPA with Hibernate and the Postgress Driver
- **Security and Auth:** Spring Security using JWT for user persistence
- **Database:** PostgreSQL server for a relational database

## Run this application on dev:

### Backend
- The backend application runs by default on port 8080.
- Create an `application-dev.properties` file and add the information below into that new properties file.
- The [docker-compose.yml](codecamp_backend%2Fdocker-compose.yml) file is in the codecamp_backend repository.
- Once created, run the docker compose command to get the postgreSQL image. The pgadmin image is optional.
    - https://docs.docker.com/reference/cli/docker/compose/up/

    
#### application-dev.properties file:
        postgresql properties
            spring.datasource.url=jdbc:postgresql://localhost:5550/codecampDB
            spring.datasource.username=codecamp123
            spring.datasource.password=codecamp123P
            spring.jpa.show-sql=true
        
        Hibernate Properties
            spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

        Hibernate ddl auto (create, create-drop, validate, update)
            spring.jpa.hibernate.ddl-auto=update

### Frontend
- To start the react.js frontend, run npm dev run for development.
  - https://docs.npmjs.com/cli/v10/commands/npm-install


- Fully operational learners site:
  - homepage
  - view all
  - edit and view button on cards
  - new assignment
- Partially operational:
  - Request one on one (Page is active but does not submit the request form to the backend yet)
- Non-operational:
  - Inbox
  - Calendar
  - Reminders
  - Profile
  - Settings

## N.B.
- This application is still under construction.
- Signup page coming soon. 
  - User creation is not yet setup on the frontend side. At the moment, curl commands or applications like postman can be used 
    to create learners and reviewers.
- Below is a model to create a learner and a reviewer user.

### for learners
        {
        "cohortStartDate": "2021-10-05",
        "firstname": "Steven",
        "lastname": "Seagal",
        "username": "learner1@domain.com",
        "password": "password",
        "authorities": ["LEARNER"]
        }


### for reviewers
        {
        "firstname": "Jean-Claude",
        "lastname": "Van Damme",
        "username": "reviewer1@domain.com",
        "password": "password",
        "authorities": ["REVIEWER"]
        }