CREATE TABLE users
    (
        id                      BIGINT PRIMARY KEY,
        cohort_start_date       DATE,
        username                VARCHAR,
        password                VARCHAR,
        isAccountNonExpired     BIT,
        isAccountNonLocked      BIT,
        isCredentialsNonExpired BIT,
        isEnabled               BIT
    );

CREATE TABLE authorities
    (
        id                      BIGINT PRIMARY KEY,
        authority               VARCHAR,
        user_id                 BIGINT
    );

CREATE TABLE assignment
    (
        id                      BIGINT PRIMARY KEY,
        number                  INTEGER,
        status                  VARCHAR,
        github_url              VARCHAR,
        branch                  VARCHAR,
        code_review_video_url   VARCHAR,
        user_id                 BIGINT,
        code_reviewer_id        BIGINT
    );