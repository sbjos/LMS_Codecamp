# Bloom Code Camp LMS

## Welcome to the Backend Repository for Bloom Code Camp LMS, an assignment review app!
To set this project up you will need to clone it to your local computer and make sure to have the prereqiosites of...
- docker / dockerdesktop
- docker compose
- intellij Idea
- Java JRE and JDK 17+

  **If there are any of these prerequisites that you are unfarmiliar with, please attend a workshop about the subject, and attend office hours. if the times are outside of your normal hours please request a 1:1 to get unblocked.**

### Make sure you are in the root directory...
1. You will need to delete a text file inside the data/pg folder.
![delete this file](codecampdelete.png) 
2. Read the `docker-compose.yml` file and change any ports that you need to based on your local setup
3. Run `docker-compose up`
     - this should be run inside a terminal from the root of the project directory.
     - for information about docker compose please see the [documentation](https://docs.docker.com/compose/)
5. Open the project inside intellij
6. Go to the `application.properties` file and follow the instructions to make your dev profile making sure that the url is pointing to the same port as the docker compose file `5550`.
   ![copy text](app-properties.png) 
7. look over the code base and familiarize yourself with [spring boot docs](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/). 
3. Run the `BackendApplication`
4. Visit `http://localhost:8080/` or localhost at a port you chose if you changed any ports in the `application-dev.properties` file.

**To get an overview of the actual application proposal you can find the docs [here](documents/composition_document.md)**
