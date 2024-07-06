--users-database
INSERT INTO users (id, cohort_start_date, firstName, lastName, username, password, isAccountNonExpired, isAccountNonLocked,
                    isCredentialsNonExpired, isEnabled)
        VALUES (1, '2023-11-20', 'fn', 'ln', 'user1', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);
INSERT INTO users (id, cohort_start_date, firstName, lastName, username, password, isAccountNonExpired, isAccountNonLocked,
                    isCredentialsNonExpired, isEnabled)
        VALUES (2, '2023-07-04', 'fn', 'ln', 'user2', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);
INSERT INTO users (id, cohort_start_date,firstName, lastName, username, password, isAccountNonExpired, isAccountNonLocked,
                    isCredentialsNonExpired, isEnabled)
        VALUES (3, NULL, 'fn', 'ln', 'reviewer', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);

--authorities-database
INSERT INTO authorities (id, authority, user_id)
        VALUES (1, 'LEARNER', 1);
INSERT INTO authorities (id, authority, user_id)
        VALUES (2, 'LEARNER', 2);
INSERT INTO authorities (id, authority, user_id)
        VALUES (3, 'REVIEWER', 3);

--assignment-database
INSERT INTO assignments (id, number, status, github_url, branch, code_review_video_url, user_id, code_reviewer_id)
     VALUES (1, 11, 'Completed', 'https://GithubUrl.com/', 'https://GithubUrl.com/branch', 'https://VideoUrl.com/', 1, 3);
INSERT INTO assignments (id, number, status, github_url, branch, code_review_video_url, user_id, code_reviewer_id)
    VALUES (2, 22, 'Submitted', 'https://GithubUrl.com', 'https://GithubUrl.com/branch', 'https://VideoUrl.com/', 1, 3);
INSERT INTO assignments (id, number, status, github_url, branch, code_review_video_url, user_id, code_reviewer_id)
    VALUES (3, 33, 'Needs review', 'https://GithubUrl.com', 'https://GithubUrl.com/branch', 'https://VideoUrl.com/', 2, 3);
