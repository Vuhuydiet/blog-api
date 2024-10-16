import pool from './pool.js';

export default {
  createUser: async (username, password, role, fullname) => {
    const { rows } = await pool.query(
      'SELECT * FROM create_user($1, $2, $3, $4)',
      [username, password, role, fullname],
    );
    return rows[0].create_user;
  },

  getUserById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM get_user_by_id($1)', [
      id,
    ]);
    return rows[0];
  },

  getUserByUsername: async (username) => {
    const { rows } = await pool.query(
      'SELECT * FROM get_user_by_username($1)',
      [username],
    );
    return rows[0];
  },

  getAllUsers: async () => {
    const { rows } = await pool.query('SELECT * FROM get_all_users()');
    return rows;
  },

  createPost: async (authorId, title, content, isPublished) => {
    const { rows } = await pool.query(
      'SELECT * FROM create_post($1, $2, $3, $4)',
      [authorId, title, content, isPublished],
    );
    return rows[0].create_post;
  },

  getAllPosts: async () => {
    const { rows } = await pool.query('SELECT * FROM get_all_posts()');
    return rows;
  },

  getPostById: async (postId) => {
    const { rows } = await pool.query('SELECT * FROM get_post_by_id($1)', [
      postId,
    ]);
    return rows[0];
  },

  publishPost: async (postId) => {
    const { rows } = await pool.query('SELECT * FROM publish_post($1)', [
      postId,
    ]);
    return rows[0];
  },

  deletePostById: async (postId) => {
    const { rows } = await pool.query('SELECT * FROM delete_post_by_id($1)', [
      postId,
    ]);
    return rows[0];
  },

  createComment: async (postId, authorId, content) => {
    const { rows } = await pool.query(
      'SELECT * FROM create_comment($1, $2, $3)',
      [postId, authorId, content],
    );
    return rows[0].create_comment;
  },

  getAllCommentsByPostId: async (postId) => {
    const { rows } = await pool.query(
      'SELECT * FROM get_all_comments_by_post_id($1)',
      [postId],
    );
    return rows;
  },

  getCommentById: async (commentId) => {
    const { rows } = await pool.query(
      'SELECT * FROM get_comment_by_id($1)',
      [commentId],
    );
    return rows[0];
  },

  deleteCommentById: async (commentId) => {
    const { rows } = await pool.query(
      'SELECT * FROM delete_comment_by_id($1)',
      [commentId],
    );
    return rows[0];
  },
};
