import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: [categorySchema],  // Changed to an array of category schema
    default: [{ value: "uncategorized", label: "Uncategorized" }]  // Default to an array with a single object
  },
  content: {
    type: String,
    required: true
  },
  slag: {
    type: String,
    required: true,
    unique: true
  },
  photoUrl: {
    type: String,
    default: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  numberOfViews:{
    type:Array,
    default:[]
  }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
