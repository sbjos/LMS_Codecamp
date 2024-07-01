--users-database
INSERT INTO users (id, cohort_start_date, username, password, isAccountNonExpired, isAccountNonLocked,
                    isCredentialsNonExpired, isEnabled)
        VALUES (1, '2023-11-20', 'user1', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);
INSERT INTO users (id, cohort_start_date, username, password, isAccountNonExpired, isAccountNonLocked,
                    isCredentialsNonExpired, isEnabled)
        VALUES (2, '2023-07-04', 'user2', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);
INSERT INTO users (id, cohort_start_date, username, password, isAccountNonExpired, isAccountNonLocked,
                    isCredentialsNonExpired, isEnabled)
        VALUES (3, NULL, 'reviewer', '$2a$10$ILzjwfFjqHnE3mt4hiFBa.rzFlD6nuAKfbvYeAtufX0eGIfQ8Lafu', 1, 1, 1, 1);

--authorities-database
INSERT INTO authorities (id, authority, user_id)
        VALUES (1, 'LEARNER', 1);
INSERT INTO authorities (id, authority, user_id)
        VALUES (2, 'LEARNER', 2);
INSERT INTO authorities (id, authority, user_id)
        VALUES (3, 'REVIEWER', 3);

--assignment-database
INSERT INTO assignment (id, number, status, github_url, branch, code_review_video_url, user_id, code_reviewer_id)
     VALUES (1, 11, 'completed', 'https://GithubUrl.com/',
    'https://GithubUrl.com/branch', 'https://VideoUrl.com/', 1, 3);
INSERT INTO assignment (id, status, number, github_url, branch, code_review_video_url, user_id, code_reviewer_id)
    VALUES (2, 'submitted', 22, 'https://GithubUrl.com',
    'https://GithubUrl.com/branch', 'https://VideoUrl.com/', 1, 3);
INSERT INTO assignment (id, status, number, github_url, branch, code_review_video_url, user_id, code_reviewer_id)
    VALUES (3, 'needs review', 33, 'https://GithubUrl.com',
    'https://GithubUrl.com/branch', 'https://VideoUrl.com/', 2, 3);
