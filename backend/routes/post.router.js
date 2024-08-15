import express from "express";
import { Router } from "express";
import {createPost,getposts,deletePost,updatePost,increasePostViews,getTrendingPosts} from "../controller/post.controller.js"
import { verifyToken } from "../utlies/userverify.js";
const router=express.Router();
router.post("/post/create", verifyToken ,createPost);
router.get("/post/posts",getposts);
router.delete("/post/delete-post/:postId/:userId",verifyToken,deletePost);
router.put("/post/update-post/:postId/:userId",verifyToken,updatePost)
router.put("/post/increase-views/:slag",verifyToken,increasePostViews);
router.get("/post/get-trending-posts",getTrendingPosts);
export default router;
