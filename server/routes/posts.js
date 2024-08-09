import express from "express";
import { getFeedPosts, getUserPosts, likePosts }  from "../controllers/posts"
import { verifyToken } from "../middleware/auth";
const router = express.Router() ;

/* READ */
router.route('/').get(verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:idOfPost/like", verifyToken, likePost);


export default router;