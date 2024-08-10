# Codecamp

## Synopsis
A learning Management System to keep track of learners assignments. This is a solutions for a learner to submit assignments and 
get them reviewed.

## User Stories
### Learner User Stories
- As a Learner I want to be able to log in to the app and be presented with a dashboard
- As a learner I want a dashboard that shows all of my currently working on, submitted, rejected, and completed assignments.
- As a Learner I want to be able to click on a `Create Assignment` button on my dashboard and be presented with a form to allow me to submit an assignment with room for my GitHub url and the branch I am working on.
- As a Learner I want to be able to click on an `Edit` button on one of the assignments on my dashboard to edit and resubmit it if it was returned unfinished.
- As a Learner I want to be able to click on a `View` button on a completed assignment on my dashboard and be able to view a review video for the given assignment.
- As a Learner I want to be able to view the 4 most recent of each assignment by status and click on `view all` to see a list of all of my completed assignments.
- As a Learner I cannot have more than 10 `Unassigned` assignments at a time.
- As a Learner I cannot have more than 10 assignments `In review` at a time.
- As a Learner I cannot have more than 10 assignments that `Needs work` at a time.

### Reviewer User Stories
- As a Reviewer I want to be able to log in to the app and be presented with a dashboard.
- As a Reviewer I want to be able to see any submitted assignments on my dashboard ready to claim.
- As a Reviewer I want to be able to click on a `claim` button on an assignment with `Submitted` status in my dashboard to claim it ready for review.
- As a Reviewer I want to be able to be able to click a `View` button on one of my claimed assignments and get a detail view of the assignment ready to review.
- As a Reviewer I want to be able to click a `Needs work` button in an assignment view to reject a learners assignment submission which will change that assignment status to needs work for the learner.
- As a Reviewer I want to be able to click on a `Complete` button to mark it as complete.
- As a Reviewer I want to be able to see the 4 most recent `Submitted` assignments and click on `view all` for a list of all-of-the submitted assignments.
- As a Reviewer I cannot have more than 10 assignments that are `In review`.

### Backend Handling:
- For assignments that are in `Submited` status, the backend handles the status change on the learner's side.
- For assignments that are being reviewed by the reviewer, the status change is handled by the frontend based on if the assignment needs to be in a `Completed` or `In review` status.
- For user creation, the backend automatically set account settings to true to allow the user to access their profile.

## Technology Stack
- **Frontend:** React JS
- **Backend API:** Spring Boot with Spring Data JPA with Hibernate and the PostgreSQL Driver
- **Security and Auth:** Spring Security using JWT for user persistence
- **Database:** PostgreSQL server for a relational database

## Domain Objects (Entities / DTO / ENUM)
### User
- id : Long
- cohortStartDate: Date
- firstname: String
- lastname: String
- username: String
- password: String
- authorities: List<Authority>
- contact: Contact
- address: Address

### contact
- id : Long
- phone: String
- email: String

### address
- id : Long
- address: String
- address2: String
- city: String
- state: String
- zipcode: String

### Authority
- id: Long
- authority: String
- user: User

### Assignment
- id: Long
- number: Integer
- name: String
- description: String
- status: String
- githubUrl: String
- branch: String
- reviewVideoUrl: String
- user: User
- codeReviewer: User

### DTOs
- AssignmentResponseDto
- UserResponseDto
- AuthCredentialRequest

### Enums
- AssignmentEnum
- AssignmentStatusEnum
- AuthorityEnum

## Database Tables
- users
- authorities
- assignments

### users
- id : number
- cohort_start_date: date
- first_name: String
- last_name: String
- user_name: varchar
- password: varchar

### authorities
- id: number
- authority: varchar
- user_id: number

### assignments
- id: number
- number: number
- github_url: varchar
- branch: varchar
- code_review_video_url: varchar
- user_id: number
- code_reviewer_id: number

## Restful Endpoints
### Authentication and verification
- **Login**                     - *Post method* - `/api/auth/login`
- **Refresh the token**         - *Get method* - `/api/auth/validate`

### Assignments
- **Get user's Assignments**    - *Get method* - `/api/assignments`
- **Get Assignment by id**      - *Get method* - `/api/assignments/{id}`
- **Update Assignment by id**   - *Put method* - `/api/assignments/{id}`
- **Create Assignment**         - *Post Method* - `/api/assignments`

### Users
- **Get user by id**             - *Get method* - `/api/user`
- **updateUser**                 - *Put method* - `/api/user`
- **Create user**                - *Post method* - `/api/create/user`

### Admin user control
- **getAllUsers**                - *Get method* - `/api/admin/user`
- **get user by username**       - *Get method* - `/api/admin/user/{username}`
- **Update user**                - *Put method* - `/api/create/admin/user/{username}`
- **Update user settings**       - *Put method* - `/api/create/admin/user/{username}`
- **Create user**                - *Post method* - `/api/create/admin/user/{username}`

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
