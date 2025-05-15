// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logOut } from '../../../Auth/Action';  // Correct import

// const UserAvatar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Get user information from Redux store
//   const auth = useSelector(store => store.auth);
//   const isLoggedIn = auth.user && auth.jwt;
  
//   // Get the first letter of user's first name for the avatar
//   const getInitial = () => {
//     if (isLoggedIn && auth.user && auth.user.firstName) {
//       return auth.user.firstName.charAt(0).toUpperCase();
//     }
//     return null;
//   };

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logOut());  
//     setIsDropdownOpen(false);
//     navigate('/');
//   };

//   // Handle navigation to My Orders
//   const handleMyOrders = () => {
//     navigate('/my-orders');
//     setIsDropdownOpen(false);
//   };

//   // Handle navigation to Login page
//   const handleLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {isLoggedIn ? (
//         <div
//           onClick={toggleDropdown}
//           className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors duration-200"
//           aria-label="User avatar"
//           role="button"
//           aria-haspopup="true"
//           aria-expanded={isDropdownOpen}
//         >
//           {getInitial()}
//         </div>
//       ) : (
//         <svg 
//           className="h-6 w-6 text-gray-700 hover:text-purple-600 cursor-pointer" 
//           xmlns="http://www.w3.org/2000/svg" 
//           fill="none" 
//           viewBox="0 0 24 24" 
//           stroke="currentColor"
//           onClick={handleLogin}
//           aria-label="Login to account"
//           role="button"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )}

//       {isLoggedIn && isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
//           <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
//             Signed in as <span className="font-medium">{auth.user.firstName} {auth.user.lastName}</span>
//           </div>
          
//           <button
//             onClick={handleMyOrders}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             My Orders
//           </button>
          
//           <button
//             onClick={handleLogout}
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../../Auth/Action';

const UserAvatar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const auth = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle logout
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("jwt");
    setShowDropdown(false);
    navigate('/');
  };

  // Navigate to profile
  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  // Navigate to orders
  const handleOrdersClick = () => {
    navigate('/my-orders');
    setShowDropdown(false);
  };

  // Navigate to login
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // If user is logged in, show avatar with dropdown
  if (auth.user) {
    const userInitial = auth.user.firstName ? auth.user.firstName.charAt(0).toUpperCase() : '?';

    return (
      <div className="relative" ref={dropdownRef}>
        <div 
          className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
          aria-label="User menu"
          aria-expanded={showDropdown}
          aria-controls="user-dropdown"
        >
          {userInitial}
        </div>

        {showDropdown && (
          <div 
            id="user-dropdown"
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {`${auth.user.firstName} ${auth.user.lastName || ''}`}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {auth.user.email}
              </p>
            </div>
            <div className="py-1">
              <div 
                onClick={handleProfileClick}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </div>
              <div 
                onClick={handleOrdersClick}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                My Orders
              </div>
              <div 
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If user is not logged in, show login button
  return (
    <div
      onClick={handleLoginClick}
      className="cursor-pointer"
      aria-label="Log in"
    >
      <svg className="h-6 w-6 text-gray-700 hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
};

export default UserAvatar;
