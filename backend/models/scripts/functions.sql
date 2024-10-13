

CREATE OR REPLACE FUNCTION create_user(
  _username VARCHAR(20),
  _password VARCHAR(255),
  _role VARCHAR(20),
  _fullname VARCHAR(100)
) 
RETURNS INTEGER 
AS $$
DECLARE
  _user_id INTEGER;
BEGIN
  if EXISTS (SELECT * FROM user_account WHERE username = _username)
  THEN
    RETURN -1;
  END IF;

  INSERT INTO user_account(username, password, role, fullname)
  VALUES (_username, _password, _role, _fullname)
  RETURNING user_id INTO _user_id;
  RETURN _user_id;
END
$$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_by_id(
  _user_id INTEGER
)
RETURNS TABLE (
  user_id INTEGER,
  username VARCHAR(20),
  password VARCHAR(255),
  role VARCHAR(20),
  fullname VARCHAR(100)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM user_account u
  WHERE u.user_id = _user_id;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_by_username(
  _username VARCHAR(20)
)
RETURNS TABLE (
  user_id INTEGER,
  username VARCHAR(20),
  password VARCHAR(255),
  role VARCHAR(20),
  fullname VARCHAR(100)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM user_account u
  WHERE u.username = _username;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  user_id INTEGER,
  username VARCHAR(20),
  password VARCHAR(255),
  role VARCHAR(20),
  fullname VARCHAR(100)
)
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM user_account;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_post(
  _author INTEGER,
  _title VARCHAR(255),
  _content TEXT,
  _is_published BOOLEAN
)
RETURNS INTEGER
AS $$
DECLARE
  _post_id INTEGER;
BEGIN
  INSERT INTO post(author, title, content, is_published)
  VALUES (_author, _title, _content, _is_published)
  RETURNING post_id INTO _post_id;

  RETURN _post_id;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_posts()
RETURNS TABLE (
  post_id INTEGER,
  author INTEGER,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP,
  is_published BOOLEAN
)
AS $$
BEGIN
  RETURN QUERY
  SELECT p.post_id, p.author, p.title, p.content, p.created_at, p.is_published
  FROM post p;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_post_by_id(
  _post_id INTEGER
)
RETURNS TABLE (
  post_id INTEGER,
  author INTEGER,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP,
  is_published BOOLEAN
)
AS $$
BEGIN
  RETURN QUERY
  SELECT p.post_id, p.author, p.title, p.content, p.created_at, p.is_published
  FROM post p
  WHERE p.post_id = _post_id;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION publish_post(
  _post_id INTEGER
)
RETURNS BOOLEAN
AS $$
BEGIN
  UPDATE post
  SET is_published = TRUE
  WHERE post_id = _post_id;

  RETURN TRUE;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_post_by_id(
  _post_id INTEGER
)
RETURNS BOOLEAN
AS $$
BEGIN
  DELETE FROM post
  WHERE post_id = _post_id;

  RETURN TRUE;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_comment(
  _post_id INTEGER,
  _author INTEGER,
  _content TEXT
)
RETURNS INTEGER
AS $$
DECLARE
  _comment_id INTEGER;
BEGIN
  INSERT INTO comment(post_id, author, content)
  VALUES (_post_id, _author, _content)
  RETURNING comment_id INTO _comment_id;

  RETURN _comment_id;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_comments_by_post_id(
  _post_id INTEGER
)
RETURNS TABLE (
  comment_id INTEGER,
  post_id INTEGER,
  author INTEGER,
  content TEXT,
  created_at TIMESTAMP
)
AS $$
BEGIN
  RETURN QUERY
  SELECT cmt.comment_id, cmt.post_id, cmt.author, cmt.content, cmt.created_at
  FROM comment cmt
  WHERE cmt.post_id = _post_id;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_comment_by_id(
  _comment_id INTEGER
)
RETURNS TABLE (
  comment_id INTEGER,
  post_id INTEGER,
  author INTEGER,
  content TEXT,
  created_at TIMESTAMP
)
AS $$
BEGIN
  RETURN QUERY
  SELECT cmt.comment_id, cmt.post_id, cmt.author, cmt.content, cmt.created_at
  FROM comment cmt
  WHERE cmt.comment_id = _comment_id;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_comment_by_id(
  _comment_id INTEGER
)
RETURNS BOOLEAN
AS $$
BEGIN
  DELETE FROM comment cmt
  WHERE cmt.comment_id = _comment_id;

  RETURN TRUE;
END
$$
LANGUAGE plpgsql;

