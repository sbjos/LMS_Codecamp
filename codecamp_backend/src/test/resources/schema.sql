CREATE TABLE users
    (
        id                          BIGINT PRIMARY KEY,
        cohort_start_date           DATE,
        first_name                  VARCHAR,
        last_name                   VARCHAR,
        user_name                   VARCHAR,
        password                    VARCHAR,
        isAccountNonExpired         BIT DEFAULT 1,
        isAccountNonLocked          BIT DEFAULT 1,
        isCredentialsNonExpired     BIT DEFAULT 1,
        isEnabled                   BIT DEFAULT 1
    );

CREATE TABLE authorities
    (
        id                          BIGINT PRIMARY KEY,
        authority                   VARCHAR,
        user_id                     BIGINT,
        FOREIGN KEY (user_id)       REFERENCES users(id)
    );

CREATE TABLE assignments
    (
        id                          BIGINT PRIMARY KEY,
        number                      INTEGER,
        status                      VARCHAR,
        github_url                  VARCHAR,
        branch                      VARCHAR,
        code_review_video_url       VARCHAR,
        user_id                     BIGINT,
        code_reviewer_id            BIGINT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (code_reviewer_id) REFERENCES users(id)
    );