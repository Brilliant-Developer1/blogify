'use client';
import getAllBlogs from '@/lib/getAllBlogs';
import React, { useEffect, useState } from 'react';

const HomeBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getAllBlogs();
        setBlogs(blogsData);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const trimDetails = details => {
    const words = details.split(' ');
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...';
    }
    return details;
  };

  return (
    <div className="container my-10 px-4">
      <h1 className="text-7xl text-center  text-emerald-500">Blogs</h1>
      <div className="blogs-list flex flex-wrap gap-4 my-10 justify-center">
        {blogs.slice(0, 3).map((blog, index) => (
          <div
            key={index}
            className="card max-w-96 bg-base-100 shadow-xl image-full"
          >
            <figure>
              <img src={blog.imageUrl} alt={blog.blogName} />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">{blog.blogName}</h2>
              <p>{trimDetails(blog.details)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-accent text-slate-200 rounded">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBlogs;
