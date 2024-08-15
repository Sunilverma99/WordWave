import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import Carousal from "../components/Carousal.jsx";
import { FaHandsHelping } from "react-icons/fa";
import { GoSponsorTiers } from "react-icons/go";
import { IoReorderThree } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import useScrollToTop from "../components/useScrollToTop.jsx"
import toast from 'react-hot-toast';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);
  const navigate = useNavigate();
  useScrollToTop();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/get-trending-posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      return toast.error('Please fill in all fields');
    }
    try {
      const response = await fetch('/api/addMonthlySubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = await response.json();
      if(response.status === 200) {
        toast.success('Subscribed successfully');
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        toast.error('An error occurred');
        setEmail('');
        setFirstName('');
        setLastName('');
      }
    } catch (error) {
      console.error(error);
      setEmail('');
      setFirstName('');
      setLastName('');
      toast.error('An error occurred');
    }
  };
  return (
    <div>
     <div className="flex flex-col lg:flex-row gap-4 p-4">
  <div className="lg:max-w-5xl max-w-full lg:mx-4 flex-1">
    <Carousal />
  </div>
  <div className=" bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">5-Min Monthly</h3>
    <p className="mb-4">Sign-up to receive newsletter via email</p>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        type="text"
        placeholder="First Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        type="text"
        placeholder="Last Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <p className="text-gray-600 text-sm">
        We will only contact you with the newsletter and the occasional special email. You can unsubscribe anytime.
      </p>
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded mt-2"
      >
        SUBSCRIBE
      </button>
    </form>
  </div>
</div>

      
      <div className="max-w-8xl pl-12 pr-12 flex flex-col gap-8 py-7">
      <div className="flex gap-6 justify-between flex-wrap">
  {posts && posts.length > 0 ? (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">Trending Posts</h2>
      <div className="flex flex-wrap gap-6 items-center ">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <Link
        to={"/search"}
        className="text-lg text-teal-500 hover:underline text-center"
      >
        View all posts
      </Link>
    </div>
  ) : (
    
    Array(4).fill(null).map((_, index) => (
      
<div role="status" key={index} className="max-w-sm p-4 border  border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg>
    </div>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div className="flex items-center mt-4">
       <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    </div>
    <span className="sr-only">Loading...</span>
</div>

    ))
  )}
</div>

      </div>
    <div className="flex items-center justify-center py-20 bg-gray-900 text-white">
        <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Technologies & regulations for clean & sustainable transportation</h1>
            <p className="text-md md:text-lg mb-4">Stay informed</p>
            <p className="text-sm md:text-md mb-6">Information + Context + Judgment</p>
            <Link to={"/consulting"} className="inline-block px-6 py-2 border border-white text-white font-medium text-md leading-tight uppercase rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 transition duration-150 ease-in-out">
                See Our Consulting Services
            </Link>
        </div>
    </div>
    <div className=" flex flex-wrap justify-around p-8 bg-gray-50 rounded-lg shadow-lg">
        <div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FaHandsHelping className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Contribute
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Contribute an article to the website, the content reaches thousands of industry professionals.
            </p>
            <p className="py-4">Provide feedback on any content, get in touch.</p>
            <button
             onClick={()=>navigate('/contact')}
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <GoSponsorTiers className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Sponsor
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Consider sponsoring the website. Your company logo will be displayed on the website and on newsletters.
            </p>
            <p className="py-4">And supporting a good website is good karma.</p>
            <button
             onClick={()=>navigate('/sponsors')}
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <IoReorderThree className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Consult
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Receive unbiased information on the rapidly changing transportation sector.
            </p>
            <p className="py-4">Policies, technologies and market changes.</p>
            <a
              href="#"
              className="inline-flex font-medium items-center text-blue-600 hover:underline"
            >
              <button
       onClick={()=>navigate('/consulting')}
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
               <FaArrowRight />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
