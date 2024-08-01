import { Select, TextInput, FileInput, Button } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollToTop from "../components/useScrollToTop.jsx"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../../firebase';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";

export default function CreatePost() {
  useScrollToTop();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', category: [] });
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageIsPresent, setImageIsPresent] = useState(false);
  const navigate = useNavigate();

  const categoryOptions = [
    { value: 'Business', label: 'Business' },
    { value: 'Coding', label: 'Coding' },
    { value: 'Design', label: 'Design' },
    { value: 'Illustrator', label: 'Illustrator' },
    { value: 'Tech', label: 'Tech' },
    { value: 'UI/UX', label: 'UI/UX' },
    { value: 'Website', label: 'Website' },
    { value: 'News', label: 'News' }
  ];

  const handleImageUpload = async () => {
    setImageUpload(true);
    if (!files) {
      setImageIsPresent(false);
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + files.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      }, (error) => {
        setImageUpload(false);
        toast.error("Image upload failed");
        setImageUploadError('Image upload failed (File must be less than 2MB)');
        setImageUploadProgress(null);
        setImageUrl(null);
        setFiles(null);
        setImageUpload(false);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.success("Image uploaded successfully");
          setImageUrl(downloadURL);
          setFormData({ ...formData, photoUrl: downloadURL });
          setImageUpload(false);
          setImageIsPresent(true);
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category.length) {
      return toast.error("Please fill all the fields");
    }
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success("Post created successfully");
        navigate(`post/${data.slag}`);
      } else {
        toast.error("Failed to create a post");
      }
    } catch (error) {
      toast.error("Failed to create a post");
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className="mb-4 text-center text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Create</span> A Post
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <MultiSelect
            className='w-full'
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            labelledBy="Add category"
          />
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFiles(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleImageUpload}
          >
            {imageUpload ? (
              <div className='flex w-10 h-10 items-center'>
                <CircularProgressbar
                  value={imageUploadProgress || 0}
                  text={`${imageUploadProgress}%`}
                  strokeWidth={5} />
              </div>
            ) : ("Upload")}
          </Button>
        </div>
        {imageIsPresent && (
          <img src={imageUrl} alt="postImage" className='w-full h-72 object-cover rounded-lg border-teal-600 border-4' />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
      </form>
    </div>
  );
}
