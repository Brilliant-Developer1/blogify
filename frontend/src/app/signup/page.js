"use client"
import GoogleLogin from '@/components/Login-Registration/GoogleLogin';
import { Navbar } from '@/components/Navbar';
import useAuth from '@/hooks/useAuth';
import { Tv2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Signup = () => {
  const [passMatch, setPassMatch] = useState(true);
  const { createUser, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    if (password !== confirm_password) {
      setPassMatch(false);
      return;
    }

    setPassMatch(true);

    try {
      await createUser(email, password);

      const userData = { name, email, password };

      const response = await fetch('http://localhost:6173/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
      } else {
        console.error('Signup failed:', data.message);
      }

    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left my-8">
            <h2 className="text-5xl font-bold">Create new account</h2>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered mt-2"
                  name="confirm_password"
                  required
                />
                {!passMatch && (
                  <div className="my-2">
                    <p className="text-red-400">Passwords do not match!</p>
                  </div>
                )}
              </div>
              <div>
                <p>
                  Old user? Please login <Link className="link" href="/login">here</Link>.
                </p>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-outline btn-neutral rounded">
                  Signup
                  <Tv2 />
                </button>
              </div>
              <div className="mt-6">
                <GoogleLogin />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup;
