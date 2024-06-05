import Hero from '@/components/Hero';
import HomeBlogs from '@/components/HomeBlogs';
import { Navbar } from '@/components/Navbar';
import React from 'react';

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      <HomeBlogs/>
    </div>
  );
};

export default Homepage;
