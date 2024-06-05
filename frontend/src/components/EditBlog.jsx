'use client';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const EditBlog = ({ _id }) => {
  const token = localStorage.getItem('token');
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);
  const [blogName, setBlogName] = useState(blog.blogName);
  const [imageUrl, setImageUrl] = useState(blog.imageUrl);
  const [details, setDetails] = useState(blog.details);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        await fetch(`https://blogify-server-keb1.onrender.com/blogs/${_id}`)
          .then(res => res.json())
          .then(data => {
            setBlog(data);
            setBlogName(data.blogName);
            setImageUrl(data.imageUrl);
            setDetails(data.details);
          });
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [_id]);

  const handleSubmit = async data => {
    const response = await fetch(
      `https://blogify-server-keb1.onrender.com/blogs/${blog._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update blog');
    }
    console.log(response);
    const responseData = await response.json();
    setMessage('Blog Updated successfully!');
    setBlogName('');
    setImageUrl('');
    setDetails('');

    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setShowConfirmUpdate(true);
  };

  const handleConfirmUpdate = confirm => {
    setShowConfirmUpdate(false);
    if (confirm) {
      const data = { blogName, imageUrl, details };
      handleSubmit(data);
    }
  };

  const handleDelete = async () => {
    await fetch(`https://blogify-server-keb1.onrender.com/blogs/${blog._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  const handleConfirm = confirm => {
    setShowConfirm(false);
    if (confirm) {
      handleDelete();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-8 max-w-xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Update Blog</h1>
        <button
          onClick={() => setShowConfirm(true)}
          className="btn btn-outline btn-neutral rounded"
        >
          <Trash />
        </button>
      </div>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Blog Name</label>
          <input
            type="text"
            value={blogName}
            onChange={e => setBlogName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Short Description</label>
          <textarea
            value={details}
            onChange={e => setDetails(e.target.value)}
            className="w-full p-2 border h-40 border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="btn btn-outline btn-neutral rounded">
            Update Blog
          </button>
        </div>
      </form>
      {message && <p className="mt-4">{message}</p>}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Are you sure you want to delete this blog?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleConfirm(false)}
                className=" mr-2 btn btn-outline btn-neutral rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className="btn btn-accent"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmUpdate && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Are you sure you want to Update this blog?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleConfirmUpdate(false)}
                className=" mr-2 btn btn-outline btn-neutral rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmUpdate(true)}
                className="btn btn-accent"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
