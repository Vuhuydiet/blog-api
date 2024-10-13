

CREATE TABLE user_account (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20),

  fullname VARCHAR(100),

  CONSTRAINT pk_user PRIMARY KEY (user_id)
);

CREATE TABLE post (
  post_id INTEGER GENERATED ALWAYS AS IDENTITY,
  author INTEGER NOT NULL,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_published BOOLEAN DEFAULT FALSE,

  CONSTRAINT pk_post PRIMARY KEY (post_id),
  CONSTRAINT fk_post_user FOREIGN KEY (author) REFERENCES user_account(user_id)
);

CREATE TABLE comment (
  comment_id INTEGER GENERATED ALWAYS AS IDENTITY,
  post_id INTEGER NOT NULL,
  author INTEGER NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT pk_comment PRIMARY KEY (comment_id),
  CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES post(post_id),
  CONSTRAINT fk_comment_user FOREIGN KEY (author) REFERENCES user_account(user_id)
)
