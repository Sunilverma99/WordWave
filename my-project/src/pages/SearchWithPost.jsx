import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import useScrollToTop from "../components/useScrollToTop.jsx"
function SearchWithPost() {
    useScrollToTop();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'asc',
        category: 'uncategorized',
      });
    
      const [posts, setPosts] = useState([]);
      const [trendingPosts, setTrendingPosts] = useState([]);
      const [loading, setLoading] = useState(false);
      const [showMore, setShowMore] = useState(false);
    
      const location = useLocation();
    
      const navigate = useNavigate();
    
      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
          setSidebarData({
            ...sidebarData,
            searchTerm: searchTermFromUrl,
            sort: sortFromUrl,
            category: categoryFromUrl,
          });
        }
    
        const fetchPosts = async () => {
          setLoading(true);
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.set('limit', '8');
          const searchQuery = urlParams.toString();
          const res = await fetch(`/api/post/posts?${searchQuery}`);
          if (!res.ok) {
            setLoading(false);
            return;
          }
          if (res.ok) {
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            if (data.posts.length === 9) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
          }
        };
        fetchPosts();
      }, [location.search]);
    
      useEffect(() => {
  
        const fetchtrendingPosts = async () => {
setLoading(true);
          try {
            const res = await fetch(`/api/post/get-trending-posts`, {
              method: "GET"
            });
            const data = await res.json();

            if (res.ok) {
              setTrendingPosts(data);
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchtrendingPosts();
      }, []);
      const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
          setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
          const order = e.target.value || 'desc';
          setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
          const category = e.target.value || 'uncategorized';
          setSidebarData({ ...sidebarData, category });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };
    
      const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/posts?${searchQuery}`);
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts([...posts, ...data.posts]);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
  return (
    <div className=' '>
      <div className='p-6 border  md:border-r  border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='Business'>Business</option>
              <option value='Coding'>Coding</option>
              <option value='Design'>Design</option>
              <option value='Illustrator'>Illustrator</option>
              <option value='Tech'>Tech</option>
              <option value='UI/UX'>UI/UX</option>
              <option value='Website'>Website</option>
              <option value='News'>News</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Trending Posts:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && trendingPosts && trendingPosts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            trendingPosts &&
            trendingPosts.map((trendingPost) => <PostCard key={trendingPost._id} post={trendingPost} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchWithPost