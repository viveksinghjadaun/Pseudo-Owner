import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p>Email: pseudoowner@gmail.com</p>
            <p>Phone: +91-72316644478</p>
          </div>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-gray-400">About Us</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">© {new Date().getFullYear()} Pseudo Owner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
