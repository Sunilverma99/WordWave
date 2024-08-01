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
      const res = await fetch("/api/post/posts");
      const data = await res.json();
      setPosts(data.posts);
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
      console.log(response);
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
      <div className="md:flex gap-2 ">
      <div className=" max-w-5xl m-4"><Carousal /></div>
      <div className="md:w-1/3  bg-gray-100 p-6  rounded-lg shadow-md ml-0 m-4 ">
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
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-6 items-center justify-between">
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
        )}
      </div>
    <div class="flex items-center justify-center py-20 bg-gray-900 text-white">
        <div class="text-center">
            <h1 class="text-2xl md:text-4xl font-bold mb-4">Technologies & regulations for clean & sustainable transportation</h1>
            <p class="text-md md:text-lg mb-4">Stay informed</p>
            <p class="text-sm md:text-md mb-6">Information + Context + Judgment</p>
            <Link to={"/consulting"} class="inline-block px-6 py-2 border border-white text-white font-medium text-md leading-tight uppercase rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 transition duration-150 ease-in-out">
                See Our Consulting Services
            </Link>
        </div>
    </div>
    <div className=" flex flex-wrap justify-around p-8 bg-gray-50 rounded-lg shadow-lg">
        <div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FaHandsHelping className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Contribute
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Contribute an article to the website, the content reaches thousands of industry professionals.
            </p>
            <p className="py-4">Provide feedback on any content, get in touch.</p>
            <button
             onClick={()=>navigate('/contact')}
              type="button"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <GoSponsorTiers className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Sponsor
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Consider sponsoring the website. Your company logo will be displayed on the website and on newsletters.
            </p>
            <p className="py-4">And supporting a good website is good karma.</p>
            <button
             onClick={()=>navigate('/sponsors')}
              type="button"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <IoReorderThree className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Consult
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Receive unbiased information on the rapidly changing transportation sector.
            </p>
            <p className="py-4">Policies, technologies and market changes.</p>
            <a
              href="#"
              class="inline-flex font-medium items-center text-blue-600 hover:underline"
            >
              <button
       onClick={()=>navigate('/consulting')}
                type="button"
                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
