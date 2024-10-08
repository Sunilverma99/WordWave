import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[320px] overflow-hidden rounded-lg sm:w-[320px] transition-all'>
      <Link to={`/post/${post.slag}`}>
        <img
          src={post.photoUrl}
          alt='post cover'
          className='h-[200px] w-full object-cover group-hover:h-[160px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>
        {post.category.slice(0, 4).map((cat, index) => (
  <span className='p-2 m-1 text-xs bg-gray-100 rounded-lg' key={index}>{cat.label}</span>
))}
        </span>
        <Link
          to={`/post/${post.slag}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-160px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
