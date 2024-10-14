import db from '../models/queries.js';

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    return res.json(posts);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await db.getPostById(req.params.postId);
    if (!post) {
      return res.status(404).json({ err: 'Post not found' });
    }
    return res.json(post);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

/**
 * req.body = { title, content, isPublished }
 */
const postPost = async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;
    const postId = await db.createPost(req.user.user_id, title, content, isPublished);
    return res.json({ postId });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

const publishPost = async (req, res) => {
  try {
    await db.publishPost(req.params.postId);
    res.json({ msg: 'Post published' });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

const deletePostById = async (req, res) => {
  try {
    await db.deletePostById(req.params.postId);
    res.json({ msg: 'Post deleted' });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

const getAllCommentsByPostId = async (req, res) => {
  try {
    const comments = await db.getAllCommentsByPostId(req.params.postId);
    return res.json(comments);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

/**
 * req.body = { content }
 */
const postComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content } = req.body;
    const commentId = await db.createComment(postId, req.user.user_id, content);
    return res.json({ commentId });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

const deleteCommentById = async (req, res) => {
  try {
    await db.deleteCommentById(req.params.commentId);
    res.json({ msg: 'Comment deleted' });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}


export default { getAllPosts, getPostById, postPost, publishPost, deletePostById, getAllCommentsByPostId, postComment, deleteCommentById };