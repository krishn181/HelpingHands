import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';

export default function ProductDetailsSalon() {
  const location = useLocation();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [selectedSize, setSelectedSize] = useState('2 BHK');
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState('description');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Define steps array for checkout process
  const steps = [
    { id: 'step1', label: 'Select Service' },
    { id: 'step2', label: 'Book Appointment' },
    { id: 'step3', label: 'Confirm Order' }
  ];

  // Generate date options for the next 7 days
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Generate time slots
  const timeSlots = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:00 AM', available: true },
    { id: 3, time: '11:00 AM', available: true },
    { id: 4, time: '12:00 PM', available: true },
    { id: 5, time: '01:00 PM', available: false }, // unavailable slot example
    { id: 6, time: '02:00 PM', available: true },
    { id: 7, time: '03:00 PM', available: true },
    { id: 8, time: '04:00 PM', available: true },
    { id: 9, time: '05:00 PM', available: true },
    { id: 10, time: '06:00 PM', available: true },
    { id: 11, time: '07:00 PM', available: true },
  ];

  useEffect(() => {
    // Get service data from location state
    if (location.state && location.state.service) {
      setService(location.state.service);
    } else {
      // If no service data, use default data for testing
      setService({
        name: "Salon Service",
        image: {
          src: "/api/placeholder/600/300",
          alt: "Salon service image"
        },
        basePrices: {
          "2 BHK": {
            original: 1499,
            sale: 1199
          },
          "3 BHK": {
            original: 1999,
            sale: 1599
          },
          "4 BHK": {
            original: 2499,
            sale: 1999
          }
        },
        discount: "25% OFF",
        breadcrumbs: [
          { id: 1, name: 'Beauty Services', href: '#' },
          { id: 2, name: 'Women\'s Beauty', href: '#' }
        ],
        description: "Professional salon service by verified experts",
        rating: 4.8,
        reviews: 320,
        time: "4 hours",
        highlights: [
          'Trained and background-checked professionals',
          'Eco-friendly products and equipment',
          'Customizable service options',
          '100% satisfaction guarantee'
        ],
        details: 'Our professionals follow strict safety protocols including wearing masks and sanitizing equipment between appointments. Please ensure access to your property and clear any personal items you don\'t want included in the service.',
        similarServices: [
          {
            id: 1,
            name: "Hair Styling",
            rating: 4.7,
            reviews: 280,
            price: 999,
            discountedPrice: 799,
            time: "45 mins",
            image: "/api/placeholder/200/150"
          },
          {
            id: 2,
            name: "Hair Coloring",
            rating: 4.8,
            reviews: 210,
            price: 1499,
            discountedPrice: 1199,
            time: "90 mins",
            image: "/api/placeholder/200/150"
          },
          {
            id: 3,
            name: "Hair Treatment",
            rating: 4.9,
            reviews: 195,
            price: 1299,
            discountedPrice: 999,
            time: "60 mins",
            image: "/api/placeholder/200/150"
          }
        ]
      });
    }
  }, [location]);
  const { addToCart } = useContext(CartContext);

  // Function to render step content (placeholder - implement as needed)
  const renderStepContent = (step) => {
    switch(step) {
      case 0:
        return <div>Step 1 content</div>;
      case 1:
        return <div>Step 2 content</div>;
      case 2:
        return <div>Step 3 content</div>;
      default:
        return null;
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a home size before adding to cart');
      return;
    }
  
    if (!selectedTimeSlot) {
      alert('Please select a time slot before adding to cart');
      return;
    }
    
    if (!service.basePrices || !service.basePrices[selectedSize]) {
      alert('Price information is not available for the selected size');
      return;
    }
    
    const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    // Create a cart item object with all necessary data
    const cartItem = {
      id: service.id || Math.random().toString(36).substr(2, 9),
      name: service.name,
      size: selectedSize,
      quantity: quantity,
      price: service.basePrices[selectedSize].sale,
      originalPrice: service.basePrices[selectedSize].original,
      date: formattedDate,
      timeSlot: selectedTimeSlot,
      image: service.image?.src || '/api/placeholder/400/320'
    };
    
    // Add the item to cart using the context
    addToCart(cartItem);
    
    // Alert the user
    alert(`Added to cart: ${service.name} (${selectedSize}) x ${quantity} for ${formattedDate} at ${selectedTimeSlot}`);
    
    // Navigate to cart page after adding item
    navigate('/cart');
  };
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const handleBookSimilarService = (similarService) => {
    // Use the similar service data to navigate to the same page with new details
    const discountPercentage = Math.round(((similarService.price - similarService.discountedPrice) / similarService.price) * 100);
    
    const serviceData = {
      id: similarService.id,
      name: similarService.name,
      image: {
        src: similarService.image || "/api/placeholder/400/320",
        alt: `${similarService.name} service image`
      },
      basePrices: {
        "2 BHK": {
          original: similarService.price,
          sale: similarService.discountedPrice
        },
        "3 BHK": {
          original: similarService.price * 1.3,
          sale: similarService.discountedPrice * 1.3
        },
        "4 BHK": {
          original: similarService.price * 1.6,
          sale: similarService.discountedPrice * 1.6
        }
      },
      discount: `${discountPercentage}% OFF`,
      breadcrumbs: service.breadcrumbs,
      description: `Professional ${similarService.name} service by verified experts`,
      rating: similarService.rating,
      reviews: similarService.reviews,
      time: similarService.time,
      highlights: service.highlights,
      details: service.details,
      similarServices: service.similarServices.filter(s => s.id !== similarService.id)
    };

    // Navigate to ProductDetails page with the new service data
    navigate('/productDetailsSalon', { state: { service: serviceData } });
  };

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex-1 truncate">
              <h1 className="text-lg font-semibold truncate">{service.name}</h1>
            </div>
            <div className="flex items-center">
              <button className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="p-2 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-2">
          <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              {service.breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.id} className="inline-flex items-center">
                  {index > 0 && (
                    <svg className="w-3 h-3 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  <a href={breadcrumb.href} className="hover:text-gray-900">
                    {breadcrumb.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Basic Info - Hero image removed */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">{service.name}</h1>
          
          <div className="flex items-center mt-2">
            <div className="bg-green-500 text-white px-2 py-0.5 rounded text-sm font-medium flex items-center">
              <span>{service.rating}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 ml-2">{service.reviews} reviews</span>
            <div className="flex items-center ml-4 text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{service.time}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Select Date</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {dateOptions.map((date, index) => (
            <button
              key={index}
              className={`flex-shrink-0 p-3 rounded-lg text-center border ${
                selectedDate.toDateString() === date.toDateString()
                  ? 'border-purple-600 bg-purple-50 text-purple-600'
                  : 'border-gray-200 text-gray-600'
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="text-xs font-semibold">
                {isToday(date) ? 'Today' : formatDate(date)}
              </div>
              <div className="font-medium mt-1">{date.getDate()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Select Time Slot</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              disabled={!slot.available}
              className={`p-2 rounded-lg text-center ${
                !slot.available
                  ? 'bg-gray-100 text-gray-400 border border-gray-200'
                  : selectedTimeSlot === slot.time
                  ? 'border border-purple-600 bg-purple-50 text-purple-600'
                  : 'border border-gray-200 text-gray-600'
              }`}
              onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
            </button>
            <span className="mx-4 text-lg font-medium w-4 text-center">{quantity}</span>
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
              onClick={() => setQuantity(quantity + 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
              </svg>
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <div className="flex items-center">
              <p className="text-lg font-bold text-purple-600">₹{service.basePrices[selectedSize].sale * quantity}</p>
              <p className="ml-2 text-sm text-gray-500 line-through">₹{service.basePrices[selectedSize].original * quantity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="mt-4 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Description Section */}
        <div className="border-b border-gray-200">
          <button
            className="w-full px-4 py-3 text-left flex justify-between items-center"
            onClick={() => toggleSection('description')}
          >
            <span className="font-medium text-gray-800">Description</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${
                expandedSection === 'description' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === 'description' && (
            <div className="px-4 py-3 bg-gray-50">
              <p className="text-gray-600">{service.description}</p>
              <h4 className="font-medium mt-3 mb-2">Highlights</h4>
              <ul className="list-disc ml-5 text-gray-600">
                {service.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="border-b border-gray-200">
          <button
            className="w-full px-4 py-3 text-left flex justify-between items-center"
            onClick={() => toggleSection('details')}
          >
            <span className="font-medium text-gray-800">Details & Preparation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${
                expandedSection === 'details' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === 'details' && (
            <div className="px-4 py-3 bg-gray-50">
              <p className="text-gray-600">{service.details}</p>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div>
          <button
            className="w-full px-4 py-3 text-left flex justify-between items-center"
            onClick={() => toggleSection('reviews')}
          >
            <span className="font-medium text-gray-800">Reviews ({service.reviews})</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${
                expandedSection === 'reviews' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === 'reviews' && (
            <div className="px-4 py-3 bg-gray-50">
              <div className="flex items-center">
                <div className="bg-green-500 text-white px-2 py-0.5 rounded text-sm font-medium flex items-center">
                  <span>{service.rating}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500 ml-2">Based on {service.reviews} reviews</span>
              </div>
              <div className="mt-3 space-y-4">
                {/* Sample reviews - in a real app, these would be loaded from an API */}
                <div className="border-b border-gray-200 pb-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Priya S.</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">The service was excellent. The professional arrived on time and did a fantastic job. I'll definitely book again!</p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Rahul M.</h4>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Good service overall. The professional was knowledgeable but arrived 15 minutes late.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Similar Services */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4 px-4">Similar Services</h3>
        <div className="px-4 flex space-x-4 overflow-x-auto pb-4">
          {service.similarServices.map((similarService) => (
            <div key={similarService.id} className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={similarService.image}
                alt={similarService.name}
                className="w-full h-28 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-sm truncate">{similarService.name}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">{similarService.rating}</span>
                  <span className="text-xs text-gray-400 ml-1">({similarService.reviews})</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <span className="text-purple-600 font-bold text-sm">₹{similarService.discountedPrice}</span>
                    <span className="text-xs text-gray-400 line-through ml-1">₹{similarService.price}</span>
                  </div>
                  <span className="text-xs text-gray-500">{similarService.time}</span>
                </div>
                <button
                  onClick={() => handleBookSimilarService(similarService)}
                  className="mt-2 w-full bg-purple-600 text-white text-xs font-medium py-1.5 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Price</p>
          <div className="flex items-center">
            <p className="text-lg font-bold text-purple-600">₹{service.basePrices[selectedSize].sale * quantity}</p>
            <p className="ml-2 text-sm text-gray-500 line-through">₹{service.basePrices[selectedSize].original * quantity}</p>
          </div>
        </div>
        <button
onClick={handleAddToCart}
           className="bg-purple-600 text-white py-3 px-6 rounded-lg font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
           </svg>
           Add to Cart
         </button>
       </div>
     </div>
   );
 }
