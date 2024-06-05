"use client"
import React, { useState } from 'react';

const AddBlog = () => {
  const token = localStorage.getItem("token");
  const [blogName, setBlogName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { blogName, imageUrl, details };

    try {
      const response = await fetch('https://blogify-server-keb1.onrender.com/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        setMessage('Blog added successfully!');
        setBlogName('');
        setImageUrl('');
        setDetails('');
      } else {
        setMessage('Failed to add blog.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add blog.');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Blog Name</label>
          <input
            type="text"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Short Description</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 h-40 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="btn btn-outline btn-neutral rounded">
          Add Blog
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AddBlog;
