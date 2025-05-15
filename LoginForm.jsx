// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Basic validation
//     if (!formData.email || !formData.password) {
//       setError('All fields are required');
//       return;
//     }

//     // Email validation using regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     // You would typically call an API here to authenticate the user
//     // For now, we'll just clear the form and redirect
//     setFormData({
//       email: '',
//       password: ''
//     });
    
//     // Redirect to home page after successful login
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="mt-2 text-center text-3xl font-extrabold text-purple-900">Sign in to your account</h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Access all HelpingHands services
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
          
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Enter your email address"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <button
//                 type="button"
//                 className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
//               >
//                 Forgot your password?
//               </button>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
//             >
//               Sign in
//             </button>
//           </div>
          
//           <div className="text-center">
//             <p className="mt-2 text-sm text-gray-600">
//               Don't have an account?{' '}
//               <button
//                 type="button"
//                 onClick={() => navigate('/register')}
//                 className="text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150 font-medium"
//               >
//                 Register
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../Auth'; // Adjust path as per your file structure


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Config/apiConfig';


function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await api.post('/auth/signin', formData);
      const token = response.data.token;

      localStorage.setItem('jwt', token); // Store token for future requests
      navigate('/'); // Redirect to home page or dashboard
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-purple-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Access all HelpingHands services</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="remember-me"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>

            <button
              type="button"
              className="text-sm text-purple-600 hover:text-purple-500 focus:outline-none"
            >
              Forgot your password?
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-purple-600 hover:text-purple-500 font-medium focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;



 // Adjust path as per your file structure

// function LoginForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true); // Start loading

//     // Basic validation
//     if (!formData.email || !formData.password) {
//       setError('All fields are required');
//       setLoading(false); // Stop loading
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Please enter a valid email address');
//       setLoading(false); // Stop loading
//       return;
//     }

//     try {
//       const response = await api.post('/auth/signin', formData);
//       const token = response.data.token;

//       localStorage.setItem('jwt', token); // Store token for future requests
//       navigate('/'); // Redirect to home page or dashboard

//       // Optionally reset form data
//       setFormData({
//         email: '',
//         password: ''
//       });
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-purple-900">Sign in to your account</h2>
//           <p className="mt-2 text-center text-sm text-gray-600">Access all HelpingHands services</p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//                 placeholder="Enter your email address"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex items-center text-sm text-gray-700">
//               <input
//                 type="checkbox"
//                 name="remember-me"
//                 className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//               />
//               <span className="ml-2">Remember me</span>
//             </label>

//             <button
//               type="button"
//               onClick={() => navigate('/forgot-password')}
//               className="text-sm text-purple-600 hover:text-purple-500 focus:outline-none"
//             >
//               Forgot your password?
//             </button>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               {loading ? 'Signing In...' : 'Sign in'}
//             </button>
//           </div>

//           <div className="text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <button
//               type="button"
//               onClick={() => navigate('/register')}
//               className="text-purple-600 hover:text-purple-500 font-medium focus:outline-none"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
