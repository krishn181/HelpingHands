import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../Auth/Action';
import UserAvatar from './UserAvatar';

// Rename this to match your import in CustomerRouters
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showServices, setShowServices] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const auth = useSelector(store => store.auth);
  const jwt = localStorage.getItem("jwt");
  
  // Handle scroll event to add shadow to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showServices && !event.target.closest('.services-dropdown')) {
        setShowServices(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showServices]);

  // Service data with navigation paths and scroll targets
  const services = [
    { name: "Home Cleaning", image: "/api/placeholder/24/24", path: "/home-cleaning", scrollTo: "HouseServicesApp" },
    { name: "Salon Services", image: "/api/placeholder/24/24", path: "/salon", scrollTo: "SalonForWomenCarousel" },
    { name: "Plumbing", image: "/api/placeholder/24/24", path: "/plumbing", scrollTo: "HouseServicesApp" },
    { name: "Electrical", image: "/api/placeholder/24/24", path: "/electrical", scrollTo: "HouseServicesApp" },
    { name: "Appliance Repair", image: "/api/placeholder/24/24", path: "/appliance-repair", scrollTo: "HouseServicesApp" },
    { name: "Painting", image: "/api/placeholder/24/24", path: "/painting", scrollTo: "HouseServicesApp" },
    { name: "Pest Control", image: "/api/placeholder/24/24", path: "/pest-control", scrollTo: "HouseServicesApp" },
    { name: "Home Shifts", image: "/api/placeholder/24/24", path: "/home-shifts", scrollTo: "HouseServicesApp" }
  ];

  // Filtered services based on search query
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredServices.length > 0) {
      navigate(filteredServices[0].path);
      setSearchQuery('');
    }
  };

  // Enhanced service click handler with scroll functionality
  const handleServiceClick = (service) => {
    if (location.pathname === '/') {
      // If on homepage, scroll to the section
      const element = document.getElementById(service.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If not on homepage, navigate to homepage and then scroll
      navigate('/');
      // Allow time for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(service.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    setShowServices(false);
  };

  // Function to handle logo click - always returns to homepage
  const handleLogoClick = () => {
    navigate('/');
  };

  // Function to handle mobile search click
  const handleMobileSearchClick = () => {
    const searchInput = document.getElementById('mobile-search-input');
    if (searchInput) {
      searchInput.focus();
    }
  };

  // Close mobile menu
  const handleClose = () => {
    setIsOpen(false);
  };

  // Handle register click - add console.log to debug
  const handleRegisterClick = () => {
    console.log("Register button clicked");
    navigate('/register');
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);
  
  
  useEffect(() => {
    if(auth.user){
      handleClose();
    }
    // Removed this block to fix the navigation issue
    // if(location.pathname === "/login" || location.pathname === "/register"){
    //   navigate(-1);
    // }
  }, [auth.user]);

  
  return (
    <div 
      className={`bg-white w-full font-sans sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`} 
      style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif" }}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <div 
            className="text-xl font-bold text-purple-900 cursor-pointer" 
            style={{ letterSpacing: "-0.5px" }}
            onClick={handleLogoClick}
            aria-label="Go to homepage"
          >
            Helping<span className="text-purple-500">Hands</span>
          </div>
        </div>
        
        {/* Search Bar */}
        {/* <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Search services"
            />
            <button type="submit" aria-label="Submit search">
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          {searchQuery.length > 0 && filteredServices.length > 0 && (
            <div className="absolute mt-1 w-full max-w-xl bg-white border border-gray-200 rounded-md shadow-lg z-20">
              {filteredServices.map((service) => (
                <div
                  key={service.name}
                  onClick={() => {
                    navigate(service.path);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <img src={service.image} alt={service.name} className="w-5 h-5 mr-2" />
                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          )}
        </form> */}

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          
          {/* Services Dropdown */}
          <div className="relative services-dropdown">
            <button 
              className="text-gray-700 hover:text-purple-600 font-medium flex items-center"
              onClick={() => setShowServices(!showServices)}
              aria-expanded={showServices}
              aria-controls="services-menu"
            >
              <span>Services</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showServices && (
              <div 
                id="services-menu"
                className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md py-3 w-64 z-10 grid grid-cols-2 gap-2"
              >
                {services.map((service) => (
                  <div
                    key={service.name}
                    onClick={() => handleServiceClick(service)}
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    <img src={service.image} alt="" className="w-6 h-6 mr-2" />
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modified the register button to use the handleRegisterClick function */}
          {!auth.user && (
            <div 
              onClick={handleRegisterClick} 
              className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
            >
              Register
            </div>
          )}
          
          <div onClick={() => navigate('/help')} className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer">Help</div>
          <div className="flex items-center space-x-4">
            {/* User Avatar - Replaces the previous user icon */}
            <UserAvatar />

            {/* Shopping Bag Icon */}
            <svg 
              className="h-6 w-6 text-gray-700 hover:text-purple-600 cursor-pointer" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              onClick={() => navigate('/cart')}
              aria-label="Shopping Cart"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <div 
              className="ml-4 text-lg font-bold text-purple-900 cursor-pointer" 
              style={{ letterSpacing: "-0.5px" }}
              onClick={handleLogoClick}
            >
              Helping<span className="text-purple-500">Hands</span>
            </div>
          </div>

          {/* Icons in Mobile */}
          <div className="flex items-center space-x-4">
            <svg 
              onClick={handleMobileSearchClick}
              className="h-6 w-6 text-gray-700 cursor-pointer" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-label="Search"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            {/* User Avatar - Mobile */}
            <UserAvatar />
            
            <svg 
              className="h-6 w-6 text-gray-700 cursor-pointer" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              onClick={() => navigate('/cart')}
              aria-label="Shopping Cart"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="px-4 pt-2 pb-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {searchQuery.length > 0 && filteredServices.length > 0 && (
                <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {filteredServices.map((service) => (
                    <div
                      key={service.name}
                      onClick={() => {
                        navigate(service.path);
                        setSearchQuery('');
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <img src={service.image} alt="" className="w-5 h-5 mr-2" />
                      <span>{service.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </form>

            <div className="space-y-3">
              <div>
                <button 
                  className="flex items-center justify-between w-full py-2 text-base font-medium text-gray-700"
                  onClick={() => setShowServices(!showServices)}
                  aria-expanded={showServices}
                  aria-controls="mobile-services-menu"
                >
                  <span>Services</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showServices ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>

                {showServices && (
                  <div id="mobile-services-menu" className="bg-gray-50 rounded-md py-2 mt-1 grid grid-cols-1 gap-1">
                    {services.map((service) => (
                      <div
                        key={service.name}
                        onClick={() => {
                          handleServiceClick(service);
                          setIsOpen(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        <img src={service.image} alt="" className="w-6 h-6 mr-2" />
                        <span>{service.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modified to use handleRegisterClick */}
              {!auth.user && (
                <div 
                  onClick={handleRegisterClick} 
                  className="block py-2 text-base font-medium text-gray-700 cursor-pointer"
                >
                  Register
                </div>
              )}
              
              {auth.user && (
                <div 
                  onClick={() => {
                    navigate('/my-orders');
                    setIsOpen(false);
                  }} 
                  className="block py-2 text-base font-medium text-gray-700 cursor-pointer"
                >
                  My Orders
                </div>
              )}
              
              <div 
                onClick={() => {
                  navigate('/help');
                  setIsOpen(false);
                }} 
                className="block py-2 text-base font-medium text-gray-700 cursor-pointer"
              >
                Help
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}