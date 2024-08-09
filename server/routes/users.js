import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";

const router = express.Router();

/* READ */
router.route('/:id').get(verifyToken, getUser);
router.route('/:id/friends').get(verifyToken, getUserFriends);

/* UPDATE */
router.route('/:id/:friendId').patch(verifyToken, addRemoveFriend);

export default router; 