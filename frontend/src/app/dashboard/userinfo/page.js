"use client"
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { CircleUser, Key, Mail, Phone, User } from 'lucide-react';

const UserInfo = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    _id:'',
    displayName: '',
    email: '',
    password: '',
    age: '',
    contact: ''
  });

  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://blogify-server-keb1.onrender.com/users', {
          headers: {
            'Content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const currentUserData = data.find(item => item.email === user.email);
          if (currentUserData) {
            setUserData(currentUserData);
          } else {
            console.error('Current user data not found');
          }
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.email, token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUserData = { ...userData };
      delete updatedUserData._id;
      delete updatedUserData.email;
  
      const response = await fetch(`https://blogify-server-keb1.onrender.com/users/${userData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData)
      });
  
      if (response.ok) {
        console.log('User profile updated successfully');
      } else {
        console.error('Failed to update user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  
  

  return (
    <section className="container flex flex-col items-center">
      <div className="flex  justify-center items-start gap-5 mt-20">
        {/* Profile Image */}
        <div className="flex flex-row">
          <img className="rounded-2xl" src={user?.photoURL || 'https://ui-avatars.com/api/?background=7eedd5&color=024d3c&bold=true'} alt="Profile Image" />
        </div>
        {/* User Info */}
        <div className="flex flex-col gap-2 items-center">
          <label className="input input-bordered flex items-center gap-2">
            <User size={20}/>
            <input
              name="displayName"
              value={userData.displayName}
              onChange={handleChange}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <Mail size={20} />
            <input
              name="email"
              value={userData.email}
              onChange={handleChange}
              type="email"
              className="grow"
              placeholder="Email"
              disabled
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <Key size={20} />
            <input
              name="password"
              value={userData.password}
              onChange={handleChange}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <CircleUser size={20} />
            <input
              name="age"
              value={userData.age}
              onChange={handleChange}
              type="number"
              className="grow"
              placeholder="Age"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <Phone size={20} />
            <input
              name="contact"
              value={userData.contact}
              onChange={handleChange}
              type="number"
              className="grow"
              placeholder="Contact"
            />
          </label>
          <div className="my-5">
            <button onClick={handleUpdateProfile} className="btn btn-outline btn-neutral rounded">
              Update profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
