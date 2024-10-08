import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'flowbite-react'; // Assuming you have a Table component
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Check if currentUser is defined
        if (currentUser) {
          let response;
          if (currentUser.isAdmin) {
            response = await fetch(`/api/post/posts`, {
              method: "GET"
            });
          } else if (currentUser.isContentWriter && currentUser._id) {
            response = await fetch(`/api/post/posts?userId=${currentUser._id}`, {
              method: "GET"
            });
          }
  
          if (response) {
            const data = await response.json();
            if (response.ok) {
              if (data.posts.length < 9) {
                setShowMore(false);
              } else {
                setShowMore(true);
              }
              setPosts(data.posts);
            }
          } else {
            console.log("Failed to fetch posts or currentUser does not have valid role");
          }
        } else {
          console.log("currentUser is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    if ((currentUser?.isContentWriter || currentUser?.isAdmin) && posts.length === 0) {
      fetchPosts();
    }
  }, [currentUser, posts.length]);  // Add dependencies for useEffect
  

  const handleShowMore = async () => {
    setShowMore(false);
    try {
      const res = await fetch(`/api/post/posts?userId=${currentUser._id}&startIndex=${posts.length}`, {
        method: "GET"
      });
      const data = await res.json();
      if (res.ok) {
        if (data.posts.length < 9) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
        setPosts([...posts, ...data.posts]);
      }
    } catch (error) {
      toast.error('Failed to Load More Posts');
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/delete-post/${deletePostId}/${currentUser._id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Post Deleted Successfully");
        setPosts(posts.filter(post => post._id !== deletePostId));
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="overflow-x-auto mx-auto w-full p-2">
      <Table>
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          {
            currentUser.isContentWriter && <Table.HeadCell>Edit</Table.HeadCell>
          }
        </Table.Head>
        {posts.map((post) => (
          <Table.Body key={post._id} className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'>
              <Table.Cell>
                {new Date(post.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/post/${post.slag}`}>
                  <img
                    src={post.photoUrl}
                    alt={post.title}
                    className='w-20 h-10 object-cover bg-gray-500'
                  />
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link
                  className='font-medium text-gray-900 dark:text-white'
                  to={`/post/${post.slag}`}
                >
                  {post.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <span
                  onClick={() => { setShowModal(true); setDeletePostId(post._id); }}
                  className='font-medium text-red-500 hover:underline cursor-pointer'
                >
                  Delete
                </span>
              </Table.Cell>
              { currentUser.isContentWriter && <Table.Cell>
                <Link
                  className='text-teal-500 hover:underline'
                  to={`/update-post/${post._id}`}
                >
                  <span>Edit</span>
                </Link>
              </Table.Cell>}
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      {showMore && <button onClick={(handleShowMore)} className='text-teal-500 text-sm rounded-lg px-3 flex justify-center mx-auto'>Show More </button>}
      {showModal &&
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete your post?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeletePost}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
}
