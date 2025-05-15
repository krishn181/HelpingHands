// import React from 'react';
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// import { MainCarouselData } from './MainCarouselData';

// const responsive = {
//   0: { items: 1 },           // 1 item on small screens
//   768: { items: 2 },         // 2 items on medium screens
//   1024: { items: 3 },        // 3 items on larger screens
// };

// const MainCarousel = () => {
//   const items = MainCarouselData.map((item, index) => (
//     <div
//       key={index}
//       className="relative w-full px-2 group"
//       data-value={index + 1}
//     >
//       {/* Image */}
//       <img
//         src={item.image}
//         alt={`Carousel ${index + 1}`}
//         className="w-full h-[300px] sm:h-[450px] object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
//       />

//       {/* Caption centered and visible on hover */}
//       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//         <div className="text-center px-4">
//           <h3 className="text-white text-xl sm:text-3xl font-playfair mb-4">{item.caption}</h3>
//         </div>
//       </div>

//       {/* Button at the bottom center */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full text-center">
//         <button className="bg-white text-black font-poppins px-6 py-2 rounded-full hover:bg-black hover:text-white transition duration-300 shadow-lg">
//           Book Now
//         </button>
//       </div>
//     </div>
//   ));

//   return (
//     <div className="py-8 px-4">
//       <AliceCarousel
//         mouseTracking
//         items={items}
//         responsive={responsive}
//         controlsStrategy="alternate"
//         autoPlay
//         autoPlayInterval={2000}
//         infinite
//         disableButtonsControls
//         disableDotsControls={false}
//       />
//     </div>
//   );
// };

// // export default MainCarousel;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';

const responsive = {
  0: { items: 1 },           // 1 item on small screens
  768: { items: 2 },         // 2 items on medium screens
  1024: { items: 3 },        // 3 items on larger screens
};

const MainCarousel = () => {
  const navigate = useNavigate();

//   // Function to handle the redirection to ProductDetails page
//   const handleViewDetails = (service) => {
//     navigate('/product-details', { 
//       state: { 
//         service: {
//           name: service.caption,
//           image: {
//             src: service.image,
//             alt: service.caption
//           },
//           basePrices: service.price, 
//           discount: service.discount,
//           breadcrumbs: service.breadcrumbs,
//           sizes: service.sizes,
//           description: service.description,
//           highlights: service.highlights,
//           details: service.details,
//           rating: service.rating,
//           reviews: service.reviewCount,
//           time: service.time
//         }
//       }
//     });
//   };

const handleViewDetails = (service, e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  try {
    // Calculate discount percentage
    const discountPercentage = Math.round(((service.price - service.discountedPrice) / service.price) * 100);
    
        
    // Create formatted service data to pass to ProductDetails page
    const serviceData = {
      id: service.id || Math.floor(Math.random() * 1000),
      name: service.name,
      image: {
        src: service.image || "/api/placeholder/400/320",
        alt: `${service.name} service image`
      },
      basePrices: {
        '2 BHK': { original: service.price, sale: service.discountedPrice },
        '3 BHK': { original: Math.round(service.price * 1.3), sale: Math.round(service.discountedPrice * 1.3) },
        '4 BHK': { original: Math.round(service.price * 1.6), sale: Math.round(service.discountedPrice * 1.6) }
      },
      discount: `${discountPercentage}% OFF`,
      breadcrumbs:service.breadcrumbs,
      description: `Professional ${service.name} service by verified experts`,
      rating: service.rating,
      reviews: service.reviews,
      time: service.time,
      highlights: [
        'Trained and certified professionals',
        'Premium products and techniques',
        'Hygienic and safe procedures',
        '100% satisfaction guarantee'
      ],
      details: 'Our professionals follow strict hygiene protocols. Please ensure you\'re available at the scheduled time. Service can be customized based on your preferences.',
    };

    // Navigate to ProductDetails page with the service data
    navigate('/home/productDetailsS', { state: { service: serviceData } });
  } catch (error) {
    console.error("Navigation error:", error);
  }
};
  const items = MainCarouselData.map((item, index) => (
    <div
      key={index}
      className="relative w-full px-2 group"
      data-value={index + 1}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={`Carousel ${index + 1}`}
        className="w-full h-[300px] sm:h-[450px] object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
      />

      {/* Caption centered and visible on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="text-center px-4">
          <h3 className="text-white text-xl sm:text-3xl font-playfair mb-4">{item.caption}</h3>
          {/* <p className="text-white text-lg font-semibold font-poppins">From ₹{item.price}</p> */}
        </div>
      </div>

      {/* Button at the bottom center */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full text-center">
        <button 
          className="bg-white text-black font-poppins px-6 py-2 rounded-full hover:bg-black hover:text-white transition duration-300 shadow-lg"
          onClick={() => handleViewDetails(item)}
        >
          Book Now
        </button>
      </div> */}
    </div>
  ));

  return (
    <div className="py-8 px-4">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        autoPlay
        autoPlayInterval={2000}
        infinite
        disableButtonsControls
        disableDotsControls={false}
      />
    </div>
  );
};

export default MainCarousel;
