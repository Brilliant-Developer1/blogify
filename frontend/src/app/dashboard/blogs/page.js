"use client"
import SortFilterBlogs from '@/components/SortFilterBlogs';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Blogs = () => {
  const token = localStorage.getItem('token');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://blogify-server-keb1.onrender.com/blogs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include', // Include credentials if needed
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const blogsData = await response.json();
        setBlogs(blogsData);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const trimDetails = (details) => {
    const words = details.split(' ');
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...';
    }
    return details;
  };
// Sort blogs
const sortedBlogs = sortBlogs(blogs, sortOption);

// Filter blogs by search value
const filteredBlogs = searchValue ? sortedBlogs.filter(blog => blog.blogName.toLowerCase().includes(searchValue.toLowerCase())) : sortedBlogs;


  return (
    <div className="container my-10 px-4">
      <h1 className="text-7xl text-center  text-emerald-500">Blogs</h1>

      <div className="flex justify-center items-center flex-col">
        {/* Sort and Search bar Start */}
      <div className="static sm:sticky bg-white top-0 z-10  p-8 w-full flex justify-around  items-center gap-3 sm:gap-1 flex-col lg:flex-row ">
              {/* Sort Option Start */}
              <SortFilterBlogs
                setSortOption={setSortOption}
                sortOption={sortOption}
              ></SortFilterBlogs>
              {/* Sort Option End */}
              {/* Search And Add User Form Start */}
              <div className="flex flex-col w-full sm:flex-row justify-end gap-2 ">
                <form className="flex-1 flex justify-end">
                  <input
                    type="text"
                    required
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search Names"
                    className="input input-bordered w-full max-w-none md:max-w-lg input-accent bg-transparent  "
                  />
                </form>
              </div>
              {/* Search And Add User Form End */}
            </div>
            {/* Sort and Search bar End */}
            {/* Cards Grid Start */}
      <div className="blogs-list flex flex-wrap gap-4 my-10 justify-center">
        {filteredBlogs.map((blog, index) => (
          <div key={index} className="card max-w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={blog.imageUrl} alt={blog.blogName} />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">{blog.blogName}</h2>
              <p>{trimDetails(blog.details)}</p>
              <div className="card-actions justify-between items-center">
              <Link href={`blogs/${blog._id}`}>
              <button  className="border p-2 rounded">
              <Pencil />
              </button>
              </Link>

                <button className="btn btn-accent text-slate-200 rounded">Read More</button>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Cards Grid End */}
      </div>
    </div>
  );
}

  // Function to sort blogs
  const sortBlogs = (blogs, sortOption) => {
    switch (sortOption) {
      case 'option1':
        return [...blogs].sort((a, b) => a.blogName.toLowerCase().includes('javascript') ? -1 : 1);
      case 'option2':
        return [...blogs].sort((a, b) => a.blogName.toLowerCase().includes('vue') ? -1 : 1);
      case 'option3':
        return [...blogs].sort((a, b) => a.blogName.toLowerCase().includes('mongodb') ? -1 : 1);
      default:
        return blogs;
    }
  };

export default Blogs;
