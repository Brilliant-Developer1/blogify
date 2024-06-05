'use client';
import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import getAllBlogs from '@/lib/getAllBlogs';

const Dashboard = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const blogs = await getAllBlogs();
        setBlogCount(blogs.length);
      } catch (error) {
        console.error('Error fetching blog count:', error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:6173/users');
        if (response.ok) {
          const data = await response.json();
          setUserCount(data.length);
          setUsers(data);
          // Find and set current user
          const currentUserData = data.find(
            userData => userData.email === user.email
          );
          if (currentUserData) {
            setCurrentUser({
              name: currentUserData.displayName,
              email: currentUserData.email,
            });
          }
        } else {
          console.error('Failed to fetch user count:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchBlogCount();
    fetchUserCount();
  }, [user.email]);
  return (
    <div className="container p-4 mt-5">
      <h1 className="text-5xl text-emerald-500">Dashboard page</h1>

      <div className="flex flex-wrap gap-4 justify-around mt-10">
        {/* First card - Blog count */}
        <div className="card w-96 max-h-40 bg-base-200 shadow-xl ">
          
          <div className="card-body">
            <h2 className="card-title">Total Blogs</h2>
            <p className="text-xl">{blogCount}</p>
            
          </div>
        </div>

        {/* Second card - User count */}
        
        <div className="card w-96 max-h-40 bg-base-300 shadow-xl ">
          
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-xl">{userCount}</p>
            
          </div>
        </div>

        {/* Third card - Current user */}
        
        <div className="card w-96 max-h-40 bg-base-200 shadow-xl ">
          
          <div className="card-body">
            <h2 className="card-title">User</h2>
            <div>
            <p >Name: {currentUser.name}</p>
          <p>Email: {currentUser.email}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
