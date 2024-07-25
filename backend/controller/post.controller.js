import  {errHandler} from "../utlies/error.js";
import Post from "../models/post.model.js"
const createPost=async(req,res,next)=>{
  if(!req.user.isContentWriter){
    return next(errHandler(401,"You are not allowed to create post"));
  }
  if(req.body.title==""||req.body.content==""||!req.body.title||!req.body.content){
    return next(errHandler(400,"Title and content are required to create post"));
  }
  const slag=req.body.title.toLowerCase().split(" ").join("-").replace(/[^a-zA-Z0-9-]/g,"");
  const post={
    ...req.body,
    slag:slag,
    userId:req.user.id
  }
   const newPost=new Post(post);
   try {
       const savedPost=await newPost.save();
       res.status(200).json(savedPost);
   } catch (error) {
     next(error);
   }
}

const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Build the query object
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { "category.value": req.query.category }), // Adjusted for array of objects
      ...(req.query.slag && { slag: req.query.slag }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    };

    // Log the query object to debug
    console.log("Query Object:", query);

    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};


const deletePost = async (req, res, next) => {
  // Check if the user is a content writer or an admin
  if (!req.user.isContentWriter && !req.user.isAdmin) {
    return next(errHandler(401, "You are not allowed to delete post"));
  }

  // Check if the content writer is trying to delete their own post
  if (req.user.isContentWriter && req.params.userId !== req.user.id) {
    return next(errHandler(401, "You are not allowed to delete this post"));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

const updatePost=async(req,res,next)=>{
  if (!req.user.isContentWriter && !req.user.isAdmin) {
    return next(errHandler(401, "You are not allowed to update the post"));
  }

  // Check if the content writer is trying to delete their own post
  if (req.user.isContentWriter && req.params.userId !== req.user.id) {
    return next(errHandler(401, "You are not allowed to update the post"));
  }
   if(req.body.title==""||req.body.content==""||!req.body.title||!req.body.content){
    return next(errHandler(400,"Title and content are required to update post"));
   }
   const slag=req.body.title.toLowerCase().split(" ").join("-").replace(/[^a-zA-Z0-9-]/g,"");
   const post={
    ...req.body,
    slag:slag,
    userId:req.user.id
   }
   try{
    const updatedPost=await Post.findByIdAndUpdate(req.params.postId,{ $set:post},{new:true});
    if(!updatedPost){
      return next(errHandler(404,"Post not found"));
    }
    res.status(200).json(updatedPost);
   }catch(error){
    next(error);
   }
}
export {createPost,getposts,deletePost ,updatePost}