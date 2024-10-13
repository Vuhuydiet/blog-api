
import db from '../models/queries.js';

function canPostPost(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ err: 'Forbidden: only admin can post' });
  }
  return next();
}

async function canPublishPost(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ err: 'Forbidden: only admin can publish' });
  }

  const postId = req.params.postId;
  const userId = req.user.user_id;
  try {
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ err: 'Post not found' });
    }
    if (post.author !== userId) {
      return res.status(403).json({ err: 'Forbidden: post is not yours' });
    }
    return next();
  }
  catch(err) {
    console.error(err);
    return res.status(500).json({ err: 'Internal Server Error' });
  };
}

async function canDeletePost(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ err: 'Forbidden: only admin can delete post' });
  }
  
  const postId = req.params.postId;
  const authorId = req.user.user_id;
  try {
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ err: 'Post not found' });
    }
    if (post.author !== authorId) {
      return res.status(403).json({ err: 'Forbidden: post is not yours' });
    }
    return next();
  }
  catch(err) {
    console.error(err);
    return res.status(500).json({ err: 'Internal Server Error' });
  };
}

async function canPostComment(req, res, next) {
  try {
    const post = await db.getPostById(req.params.postId);
    if (!post) {
      return res.status(404).json({ err: 'Post not found' });
    }
    if (!post.is_published) {
      return res.status(403).json({ err: 'Forbidden: cannot comment on unpublished post' });
    }
    return next();
  }
  catch(err) {
    console.error(err);
    return res.status(500).json({ err: 'Internal Server Error' });
  };
  return next();
}

async function canDeleteComment(req, res, next) {
  const commentId = req.params.commentId;
  const user = req.user;
  try {
    const comment = await db.getCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ err: 'Comment not found' });
    }
    const author = await db.getUserById(comment.author);
    if (user.role === 'admin' && author.role === 'admin') {
      return res.status(403).json({ err: 'Forbidden: admin cannot delete admin comment' });
    }
    if (user.user_id != comment.author) {
      console.log(user, comment);
      return res.status(403).json({ err: 'Forbidden: comment is not yours' });
    }
    return next();
  }
  catch(err) {
    console.error(err);
    return res.status(500).json({ err: 'Internal Server Error' });
  };
}

export default {
  canPostPost,
  canPublishPost,
  canDeletePost,

  canPostComment,
  canDeleteComment
}