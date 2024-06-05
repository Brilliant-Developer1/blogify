import { Facebook, Instagram, Youtube } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">Topic</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <Instagram />
            </a>
            <a>
              <Youtube />
            </a>
            <a>
              <Facebook />
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by Brilliant Developer</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
