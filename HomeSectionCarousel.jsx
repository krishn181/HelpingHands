
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';

// Service Card Component
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Calculate discount percentage if not already provided
      const discountPercentage = service.discount || 0;
      
      // Format service data for ProductDetails page
      const serviceData = {
        name: service.name,
        image: {
          src: service.imageUrl || "/api/placeholder/400/320",
          alt: `${service.name} service image`
        },
        basePrices: {
          'Studio': { original: Math.round(service.price * 1.1), sale: service.price },
          '1 BHK': { original: Math.round(service.price * 1.2), sale: Math.round(service.price * 1.1) },
          '2 BHK': { original: Math.round(service.price * 1.3), sale: Math.round(service.price * 1.2) },
          '3 BHK': { original: Math.round(service.price * 1.5), sale: Math.round(service.price * 1.3) },
          '4 BHK': { original: Math.round(service.price * 1.7), sale: Math.round(service.price * 1.5) },
          '5+ BHK': { original: Math.round(service.price * 2), sale: Math.round(service.price * 1.7) }
        },
        discount: `${discountPercentage}% OFF`,
        breadcrumbs: [
          { id: 1, name: 'Home Services', href: '#' },
          { id: 2, name: 'Popular Services', href: '#' }
        ],
        description: service.description || `Professional ${service.name} service by verified experts`,
        rating: service.rating,
        reviews: service.ratingCount,
        time: service.time || "60 mins",
        highlights: [
          'Trained and background-checked professionals',
          'High-quality products and equipment',
          'Customizable service options',
          '100% satisfaction guarantee'
        ],
        details: 'Our professionals follow strict safety protocols. Please ensure access to your property and clear any personal items you don\'t want included in the service.'
      };

      // Navigate to ProductDetails page with the service data
      navigate('/product-details', { state: { service: serviceData } });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="w-20 h-20 md:w-28 md:h-28 mb-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-sm md:text-base font-medium text-center">{service.name}</h3>
      <div className="flex items-center mt-3">
        <span className="text-gray-800 font-semibold text-sm md:text-base">₹{service.price}</span>
        {service.discount && (
          <span className="text-green-600 text-xs md:text-sm ml-2">
            {service.discount}% off
          </span>
        )}
      </div>
      {service.rating && (
        <div className="flex items-center mt-3">
          <div className="flex items-center bg-green-700 text-white text-xs px-1 py-0.5 rounded">
            <span>{service.rating}</span>
            <span className="ml-0.5">★</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({service.ratingCount})</span>
        </div>
      )}
      <button 
        className="mt-5 w-full py-2 bg-white text-black border border-black text-sm font-medium rounded-md transition-colors
         duration-200 hover:bg-black hover:text-white"
        onClick={handleBookNow}
      >
        Book Now
      </button>
    </div>
  );
};

const MostBookedServices = () => {
  const navigate = useNavigate();
  
  // Most booked services data
  const services = [
    {
      id: 1,
      name: "Salon Prime",
      price: 499,
      discount: 30,
      rating: 4.8,
      ratingCount: "2.3k",
      imageUrl: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto/salon-prime.jpg",
      description: "Premium salon services at your doorstep"
    },
    {
      id: 2,
      name: "Bathroom Cleaning",
      price: 299,
      discount: 20,
      rating: 4.7,
      ratingCount: "1.8k",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661662860714-7ea91a565bf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGltYWdlJTIwb2YlMjBiYXRocm9vbSUyMGNsZWFuaW5nfGVufDB8fDB8fHww",
      description: "Professional bathroom cleaning services"
    },
    {
      id: 3,
      name: "AC Service",
      price: 399,
      discount: 15,
      rating: 4.9,
      ratingCount: "3.2k",
      imageUrl: "https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWMlMjByZXBhaXJpbmd8ZW58MHx8MHx8fDA%3D",
      description: "Complete AC service and maintenance"
    },
    {
      id: 4,
      name: "Full Home Cleaning",
      price: 799,
      discount: 25,
      rating: 4.6,
      ratingCount: "1.5k",
      imageUrl: "https://images.unsplash.com/photo-1742483359033-13315b247c74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZ1bGwlMjBob21lJTIwY2xlYW5pbmd8ZW58MHx8MHx8fDA%3D",
      description: "Comprehensive home cleaning services"
    },
    {
      id: 5,
      name: "Pest Control",
      price: 899,
      discount: 10,
      rating: 4.5,
      ratingCount: "982",
      imageUrl: "https://plus.unsplash.com/premium_photo-1682126104327-ef7d5f260cf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVzdCUyMGNvbnRyb2x8ZW58MHx8MHx8fDA%3D",
      description: "Complete pest control solutions for your home"
    },
    {
      id: 6,
      name: "Electrician",
      price: 199,
      discount: 5,
      rating: 4.7,
      ratingCount: "1.1k",
      imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cmljaWFufGVufDB8fDB8fHww",
      description: "Expert electrician services for all your needs"
    },
    {
      id: 7,
      name: "Plumbing",
      price: 249,
      discount: 10,
      rating: 4.6,
      ratingCount: "876",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661884973994-d7625e52631a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGx1bWJpbmclMjBzZXJ2aWNlfGVufDB8fDB8fHww",
      description: "Professional plumbing repair and maintenance"
    }
  ];

  const responsive = {
    0: { items: 1 },
    520: { items: 2 },
    768: { items: 3 },
    1024: { items: 4 },
    1280: { items: 5 }
  };

  const handleViewAll = () => {
    // Navigate to Products page with all services data
    navigate('/product-card', { state: { allServices: services } });
  };

  const items = services.map((service) => (
    <div key={service.id} className="px-2 py-2">
      <ServiceCard service={service} />
    </div>
  ));

  return (
    <div className="w-full bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          {/* <h2 className="text-xl font-semibold">Most Booked Services</h2> */}
          <button 
            onClick={handleViewAll}
            className="text-purple-600 font-medium text-sm hover:text-purple-800 flex items-center"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="relative">
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
      </div>
    </div>
  );
};

export default MostBookedServices;