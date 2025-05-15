
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainCarousel from '../../Components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../Components/HomeSectionCarousel/HomeSectionCarousel';
import SalonForWomenCarousel from '../../Components/HomeSectionCarousel/SalonForWomenCarousel';
import HouseServicesApp from '../../Components/HomeSectionCarousel/HouseServicesApp';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation handler functions
  const handleNavigate = (path) => {
    navigate(path);  // Trigger the navigation
  };

  // Handle scroll to section if navigated with hash
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Remove the # symbol
      const sectionId = hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Banner */}
      <MainCarousel />

      {/* Section Title */}
      <h2 
        className='text-3xl font-extrabold text-purple-900 text-center mt-5 cursor-pointer'
        onClick={() => handleNavigate('/home-cleaning')}
      >
        Most Booked Services
      </h2>
      {/* Carousel */}
      <HomeSectionCarousel />

      {/* Salon Services Section */}
      <h2 
        className='text-3xl font-extrabold text-purple-900 text-center mt-5 cursor-pointer'
        onClick={() => handleNavigate('/salon')}
      >
        Salon Services
      </h2>
      <div id="SalonForWomenCarousel" onClick={() => handleNavigate('/salon')}>
        <SalonForWomenCarousel />
      </div>

      {/* Cleaning Services Section */}
      <h2 
        className='text-3xl font-extrabold text-purple-900 text-center mt-5 cursor-pointer'
        onClick={() => handleNavigate('/home-cleaning')}
      >
        Cleaning Services
      </h2>
      <div id="HouseServicesApp" onClick={() => handleNavigate('/home-cleaning')}>
        <HouseServicesApp />
      </div>
    </>
  );
};

export default HomePage;