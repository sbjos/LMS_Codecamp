-- data.sql
INSERT INTO users (id, cohort_start_date, first_name, last_name, user_name, password, is_account_non_expired, is_account_non_locked, is_credentials_non_expired, is_enabled)
VALUES
    (1, '2023-11-20', 'John', 'Doe', 'user1', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1),
    (2, '2023-07-04', 'Jane', 'Smith', 'user2', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);
    (3, NULL, 'Jane', 'Scott', 'reviewer', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);

INSERT INTO authorities (id, authority, user_id)
VALUES
    (1, 'LEARNER', 1),
    (2, 'LEARNER', 2);
    (3, 'REVIEWER', 3);

INSERT INTO assignments (id, number, status, github_url, branch, code_review_video_url, user_id, code_reviewer_id)
VALUES
    (1, 11, 'Submitted', 'https://github.com/johndoe/project', 'main', NULL, 1, NULL),
    (2, 22, 'Completed', 'https://github.com/janesmith/project', 'dev', 'https://vid.com/review2', 2, 3);
    (3, 33, 'Needs work', 'https://github.com/janesmith/project', 'dev', 'https://vid.com/review24', 2, 1);
