import express from 'express';
const router = express.Router();

import controller from '../controllers/postsController.js';

import passport from '../services/auth.js';
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
  passport.isAuth, canPostPost,
  controller.postPost
);
router.put(
  '/:postId', 
  passport.isAuth, canPublishPost, 
  controller.publishPost
);
router.delete(
  '/:postId', 
  passport.isAuth, canDeletePost, 
  controller.deletePostById
);

router.get(
  '/:postId/comments', 
  controller.getAllCommentsByPostId
);
router.post(
  '/:postId/comments', 
  passport.isAuth, canPostComment, 
  controller.postComment
);
router.delete(
  '/:postId/comments/:commentId', 
  passport.isAuth, canDeleteComment, 
  controller.deleteCommentById
);

export default router;