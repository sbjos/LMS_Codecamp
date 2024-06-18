# Codecamp

## Synopsis
A learning Management System to keep track of learners assignments. This is a solutions for a learner to submit assignments and 
get them reviewed.



## User Stories

### Learner User Stories
- As a Learner i want to be able to log in to the app and be presented with a dashboard
- As a learner I want a dashboard that shows all of my currently working on, submitted, rejected, and completed assignments.
- As a Learner I want to be able to click on a `Create Assignment` button on my dashboard and be presented with a form to allow me to submit an assignment with room for my GitHub url and the branch I am working on.
- As a Learner I want to be able to click on an `Edit` button on one of the assignments on my dashboard to edit and resubmit it if it was returned unfinished.
- As a Learner I want to be able to click on a `View` button on a completed assignment on my dashboard and be able to view a review video for the given assignment.
- As a Learner I want to be able to view the 4 most recent `Completed` assignments and click on `view all` to see a list of all of my completed assignments.
- As a Learner I cannot have more than 4 `Unassigned` assignments at a time.
- As a Learner I cannot have more than 4 assignments `In review` at a time.
- As a Learner I cannot have more than 4 assignments that `Needs work` at a time.

### Reviewer User Stories
- As a Reviewer I want to be able to login to the app and be presented with a dashboard.
- As a Reviewer I want to be able to see any submitted assignments on my dashboard ready to claim.
- As a Reviewer I want to be able to click on a `claim` button on an assignment in my dashboard to claim it ready for review
- As a Reviewer I want to be able to be able to click a `View` button on one of my claimed assignments and get a detail view of the assignment ready to review
- As a Reviewer I want to be able to click a `Reject Assignment` button in an assignment view to reject a learners assignment submission to be resubmitted by them.
- As a Reviewer I want to be able to click on a `Complet Assignment Review` button to mark it as complete.
- As a Reviewer I want to be able to see any resubmitted assignments that I have previously rejected.
- As a Reviewer I want to be able to click a `Reclaim` button on a resubmitted assignment that I previously rejected to do a follow-up review.
- As a Reviewer I want to be able to see the 4 most recent `Submitted` assignments and clock on `view all` for a list of all-of-the submitted and resubmitted assignments.
- As a Reviewer I cannot have more than 4 assignments that are `In review`.


## Technology Stack
- **Frontend:** React JS
- **Backend API:** Spring Boot with Spring Data JPA with Hibernate and the Postgress Driver
- **Security and Auth:** Spring Security using JWT for user persistence
- **Database:** PostgreSQL server for a relational database

## Domain Objects (Entities / DTO / ENUM)

### User
- id : Long
- cohortStartDate: Date
- username: String
- password: String
- authorities: List<Authority>

### Authority
- id: Long
- authority: String
- user: User

### Assignment
- id: Long
- status: String
- number: Integer
- githubUrl: String
- branch: String
- reviewVideoUrl: String
- user: User
- codeReviewer: User

### DTOs
- AssignmentResponseDto
- AuthCredentialRequest

### Enums
- AssignmentEnum
- AssignmentStatusEnum
- AuthorityEnum

## Database Tables
- users
- authorities
- assignment

### users
- id : number
- cohort_start_date: date
- username: varchar
- password: varchar

### authorities
- id: number
- authority: varchar
- user_id: number

### assignments
- id: number
- branch: varchar
- code_review_video_url: varchar
- github_url: varchar
- number: number
- user_id: number
- code_reviewer_id: number

## Restful Endpoints

- **Login**                     `/api/auth/login`
- **Validate token**            `/api/auth/validate`
- **Get Assignments By User**   `/api/assignments`
- **Get Assignment By Id**      `/api/assignments/{id}`
- **Put Assignment by Id**      `/api/assignments/{id}`
- **Post Assignment**           `/api/assignments`



## Wireframes

### Home Page (Public)
![Home Page (Public)](./documents/images/home_page_public.jpg)

### Home Page (Authenticated)
![Home Page (Authenticated)](./documents/images/home_page_authenticated.jpg)

### Login Page
![Login Page](./documents/images/login_page.jpg)

### Learner Dashboard
![Learner Dashboard](./documents/images/learner_dashboard.jpg)

### Reviewer Dashboard
![Reviewer Dashboard](./documents/images/reviewer_dashboard.jpg)

### Learner Assignment View
![Learner Assignment View](./documents/images/learner_assignment_view.jpg)

### Reviewer Assignment View
![Reviewer Assignment View](./documents/images/reviewer_assignment_view.jpg)
