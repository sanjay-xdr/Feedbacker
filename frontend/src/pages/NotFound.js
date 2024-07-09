import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">Go to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
