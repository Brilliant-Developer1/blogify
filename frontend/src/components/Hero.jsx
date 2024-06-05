import { BookText } from 'lucide-react';
import React from 'react';

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=1497&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome To Blogify</h1>
            <p className="mb-5">
              Discover a seamless and intuitive platform designed for tech
              enthusiasts, innovators, and thought leaders. At Blogify, we
              provide the tools you need to transform your cutting-edge ideas
              into compelling narratives. From AI and cybersecurity to
              blockchain and IoT, our web app helps you share your insights with
              the world.
            </p>
            <button className="btn btn-outline btn-neutral text-white rounded ">
              {' '}
              <BookText /> All blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
