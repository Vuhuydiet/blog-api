import express from 'express';
const router = express.Router();

import controller from '../controllers/postsController.js';

import isAuth from '../services/auth.js';
import { canPostPost, canPublishPost, canDeletePost, canPostComment, canDeleteComment } from '../services/permissions.js';


router.get(
  '/', 
  controller.getAllPosts
);
router.get(
  '/:postId', 
  controller.getPostById
);
router.post(
  '/', 
  isAuth, canPostPost,
  controller.postPost
);
router.put(
  '/:postId', 
  isAuth, canPublishPost, 
  controller.publishPost
);
router.delete(
  '/:postId', 
  isAuth, canDeletePost, 
  controller.deletePostById
);

router.get(
  '/:postId/comments', 
  controller.getAllCommentsByPostId
);
router.post(
  '/:postId/comments', 
  isAuth, canPostComment, 
  controller.postComment
);
router.delete(
  '/:postId/comments/:commentId', 
  isAuth, canDeleteComment, 
  controller.deleteCommentById
);

export default router;