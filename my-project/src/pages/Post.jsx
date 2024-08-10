import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import WebsiteAdds from '../components/WebsiteAdds.jsx';
import { Spinner, Button } from 'flowbite-react';
import CommentSection from '../components/CommentSection.jsx';
import { useSelector } from 'react-redux';
import PostCard from "../components/PostCard.jsx";
import Search from "./SearchWithPost.jsx";
import useScrollToTop from "../components/useScrollToTop.jsx"
export default function Post() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [error, setError] = useState(false);
  const { slag } = useParams();
  useScrollToTop();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(false); // Reset error state
      try {
        const res = await fetch(`/api/post/posts?slag=${slag}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.posts[0]);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    };
    const updateNumberOfViews = async () => {
      try {
        const res = await fetch(`/api/post/increase-views/${slag}`, {
          method: "PUT",
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();
    updateNumberOfViews();
  }, [slag]);

  
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/posts?limit=4`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPosts();
  }, []);
 

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p>Error loading post. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <main className='flex'>
        <div className='p-3 flex flex-col max-w-screen-xl w-full min-h-screen'>
          <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
            {post && post.title}
          </h1>
          <div className='flex text-center justify-center flex-wrap'>
          {post && post.category && post.category.length > 0 && (
            post.category.map((cat, index) => (
              <Link to={`/category/${cat.value}`} key={cat._id}>
                <Button className='m-1' color='gray' pill size='xs'>
                  {cat.label}
                </Button>
              </Link>
            ))
          )}</div>
          <img
            src={post && post.photoUrl}
            alt={post && post.title}
            className='mt-10 p-3 max-h-[600px] w-full object-cover'
          />
          <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className='p-3 max-w-2xl mx-auto w-full post-content'
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          />
          <CommentSection currentUser={currentUser} postId={post && post._id} />
          <div className='flex flex-col justify-center items-center mb-5'>
            {/* Any additional content */}
          </div>
        </div>
        <div className='max-w-sm h-full md:block hidden'>
          <Search className="md:flex-col" />
        </div>
      </main>
      <div className='bg-gray-300 p-4'>
        <h1 className='text-3xl text-center mt-5 font-bold font-serif'>Recent Posts</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((recentPost) => <PostCard key={recentPost._id} post={recentPost} />)}
        </div>
      </div>
    </>
  );
}
