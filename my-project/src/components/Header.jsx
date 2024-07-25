import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from "../../redux/theme/theme.js";
import { setUser } from '../../redux/user/userSlice.js';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FcBusinessContact } from "react-icons/fc";
export default function Header() {
  const path = useLocation().pathname;
 const dispatch=useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme)
 const[searchTerm,setSearchTerm]=useState('');
 const location=useLocation();
 const navigate=useNavigate();
  const handleSignOut=async()=>{
    try{
      const res=await fetch('/api/user/signout',{
        method:"POST"
      });
      const data=await res.json();
      console.log(data);
      if(!res.ok){
        toast.error(data.message);
      }else{
        toast.success("Sign out successfully");
        dispatch(setUser(null));
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const urlParms=new URLSearchParams(location.search);
    console.log(urlParms);
    urlParms.set('searchTerm',searchTerm);
    console.log(urlParms)
    const searchQuery=urlParms.toString();
    console.log(searchQuery)
    navigate(`/search?${searchQuery}`)
  }
  console.log(searchTerm);
  useEffect(()=>{
    const urlParms=new URLSearchParams(location.search);
    const searchTermUrl=urlParms.get('searchTerm');
    if(searchTermUrl){
      setSearchTerm(searchTermUrl);
    }
  },[location.search])

  return (
    <Navbar className='border-b-2 max-w-screen  px-10'>
  <Link to='/' className=' text-black self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
    <img src="https://www.marklytics.co.uk/wp-content/uploads/2023/12/logomark0.png" className='w-full h-8 md:w-full md:h-12' alt="Logo" />
  </Link>

  

  <form class="flex  md:items-center max-w-sm ">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full sm:block hidden">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text"  value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
    </div>
    <button type="submit" onClick={handleSubmit} class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 sm:block hidden dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
    <button type="submit" onClick={()=>navigate("/search")} class="md:p-2.5 p-1.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 sm:hidden block dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
    
</form>


  <div className='flex gap-2 md:order-2 py-1'>
    {/* <Button
      className='w-12 h-10 sm:flex hidden items-center justify-center p-1'
      color='gray'
     pill
     onClick={() => dispatch(toggleTheme())}
    >
      {theme === 'light' ? <FaSun /> : <FaMoon />}
    </Button> */}
   { currentUser?(
      <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar alt='user' className='w-12 h-6' img={currentUser.photoUrl} rounded />
      }
      >
       <Dropdown.Header>
              <span className='block text-sm'>{currentUser.userName}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>  
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut} >Sign out</Dropdown.Item>
      </Dropdown>
    ):(<Link to='/sign-in'>
    <button class=" sm:w-13 sm:h-10 w-11 h-8  relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden sm:text-sm text-xs  font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Sign-in
</span>
</button>
    </Link>)}
    
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse >
    <Navbar.Link active={path === '/'} as={'div'}>
      <Link to='/' >Home</Link>
    </Navbar.Link>
    <Navbar.Link active={path === '/about'} as={'div'}>
      <Link to='/about'>About</Link>
    </Navbar.Link>
    <Navbar.Link active={path === '/contact'} as={'div'}>
      <Link to='/contact' className='flex items-center'>Contact Us </Link>
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>


  );
}