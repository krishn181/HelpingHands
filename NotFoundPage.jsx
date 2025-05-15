import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center p-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
