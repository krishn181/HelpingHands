import React, { useState, useContext, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { RadioGroup } from '@headlessui/react'
import { Rating } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { CartContext } from '../Cart/CartContext'

// Single classNames function definition
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  // Get service data from location state (passed from HouseServicesApp)
  const location = useLocation();
  const serviceData = location.state?.service || null;
  const navigate = useNavigate();
  
  // If no service data was passed through navigation, use default values
  const service = serviceData || {
    name: 'Professional House Cleaning',
    basePrices: {
      'Studio': { original: 1999, sale: 1499 },
      '1 BHK': { original: 2399, sale: 1799 },
      '2 BHK': { original: 2799, sale: 2099 },
      '3 BHK': { original: 3199, sale: 2399 },
      '4 BHK': { original: 3599, sale: 2699 },
      '5+ BHK': { original: 3999, sale: 2999 },
    },
    image: {
      src: '/api/placeholder/400/320',
      alt: 'Professional house cleaning service.',
    },
    discount: '25% OFF',
    breadcrumbs: [
      { id: 1, name: 'Home Services', href: '#' },
      { id: 2, name: 'Cleaning', href: '#' },
    ],
    description: 'Our professional house cleaning service ensures your home is spotless from floor to ceiling.',
    highlights: [
      'Trained and background-checked professionals',
      'Eco-friendly cleaning products',
      'Customizable cleaning checklist',
      '100% satisfaction guarantee',
    ],
    details: 'We bring all cleaning supplies and equipment. Please ensure access to your property and clear any personal items you don\'t want cleaned.',
    rating: 4.8,
    reviews: 1247,
    time: '3 hours'
  };

  // Generate sizes array from basePrices if not explicitly provided
  const sizes = service.sizes || (service.basePrices ? Object.keys(service.basePrices).map(name => ({ name, inStock: true })) : []);

  // Set default selected size (usually 2 BHK)
  const [selectedSize, setSelectedSize] = useState(null);

  // Initialize selectedSize when component mounts or sizes change
  useEffect(() => {
    if (sizes && sizes.length > 0) {
      const defaultSizeIndex = sizes.findIndex(size => size.name === '2 BHK');
      setSelectedSize(sizes[defaultSizeIndex >= 0 ? defaultSizeIndex : 0]);
    }
  }, [sizes]);

  // Added missing state variables
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Morning (8AM - 12PM)');
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useContext(CartContext) || { addToCart: () => console.error("CartContext not available") };
  
  // Fixed handleAddToCart function
  // const handleAddToCart = () => {
  //   try {
  //     if (!selectedSize) {
  //       alert('Please select a home size before adding to cart');
  //       return;
  //     }

  //     if (!selectedTimeSlot) {
  //       alert('Please select a time slot before adding to cart');
  //       return;
  //     }
      
  //     if (!service.basePrices || !service.basePrices[selectedSize.name]) {
  //       alert('Price information is not available for the selected size');
  //       return;
  //     }
      
  //     const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
  //     // Create a cart item object with all necessary data
  //     const cartItem = {
  //       id: service.id || Math.random().toString(36).substr(2, 9),
  //       name: service.name,
  //       size: selectedSize.name,
  //       quantity: quantity,
  //       price: service.basePrices[selectedSize.name].sale,
  //       originalPrice: service.basePrices[selectedSize.name].original,
  //       date: formattedDate,
  //       timeSlot: selectedTimeSlot,
  //       image: service.image?.src || '/api/placeholder/400/320'
  //     };
      
  //     console.log('Adding to cart:', cartItem); // Debug
      
  //     // Add the item to cart using the context
  //     addToCart(cartItem);
      
  //     // Alert the user
  //     alert(`Added to cart: ${service.name} (${selectedSize.name}) x ${quantity} for ${formattedDate} at ${selectedTimeSlot}`);
      
  //     // Navigate to cart page after adding item
  //     console.log('About to navigate to cart page...'); // Debug
      
  //     // Added setTimeout to ensure state updates before navigation
  //     setTimeout(() => {
  //       navigate('/cart');
  //     }, 100);
  //   } catch (error) {
  //     console.error('Error in handleAddToCart:', error);
  //     alert('There was an error adding this item to your cart. Please try again.');
  //   }
  // };
const handleAddToCart = () => {
  if (!selectedSize) {
    alert('Please select a home size before adding to cart');
    return;
  }

  if (!selectedTimeSlot) {
    alert('Please select a time slot before adding to cart');
    return;
  }
  
  // Fixed: Use selectedSize.name as the key to access basePrices
  if (!service.basePrices || !service.basePrices[selectedSize.name]) {
    alert('Price information is not available for the selected size');
    return;
  }
  
  const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
  // Create a cart item object with all necessary data
  const cartItem = {
    id: service.id || Math.random().toString(36).substr(2, 9),
    name: service.name,
    size: selectedSize.name, // Fixed: Use selectedSize.name instead of selectedSize object
    quantity: quantity,
    price: service.basePrices[selectedSize.name].sale,
    originalPrice: service.basePrices[selectedSize.name].original,
    date: formattedDate,
    timeSlot: selectedTimeSlot,
    image: service.image?.src || '/api/placeholder/400/320'
  };
  
  // Add the item to cart using the context
  addToCart(cartItem);
   navigate('/cart');
  // Alert the user
  alert(`Added to cart: ${service.name} (${selectedSize.name}) x ${quantity} for ${formattedDate} at ${selectedTimeSlot}`);
  
  // Navigate to cart page after adding item
  navigate('/cart');
};
  // Sample reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "April 15, 2025",
      comment: "Excellent service! The cleaners were professional and thorough. My home has never looked better.",
      isUserReview: true
    },
    {
      id: 2,
      name: "Sarah Miller",
      rating: 4,
      date: "April 10, 2025",
      comment: "Great job overall. They missed a few spots under the furniture but were quick to address it when I pointed it out.",
      isUserReview: false
    },
    {
      id: 3,
      name: "Michael Chen",
      rating: 5,
      date: "April 5, 2025",
      comment: "Fantastic cleaning service! The team was punctual, efficient, and left my apartment spotless.",
      isUserReview: false
    },
    {
      id: 4,
      name: "Rebecca Jones",
      rating: 3,
      date: "March 30, 2025",
      comment: "Decent service but the cleaners arrived 30 minutes late. The cleaning was good though.",
      isUserReview: false
    },
    {
      id: 5,
      name: "David Wilson",
      rating: 5,
      date: "March 25, 2025",
      comment: "Absolutely worth every penny! They cleaned areas I didn't even think about. Will definitely book again.",
      isUserReview: false
    }
  ]);

  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  // Get the current price based on selected size - with safe access
  const currentPrices = selectedSize && service.basePrices ? service.basePrices[selectedSize.name] : null;
  const originalPrice = currentPrices ? `₹${currentPrices.original}` : 'N/A';
  const salePrice = currentPrices ? `₹${currentPrices.discountedPrice || currentPrices.sale}` : 'N/A';

  // Calculate average rating
  const averageRating = service.rating || (reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0);
  const totalRatings = service.reviews || reviews.length;

  // Handle adding a new review
  const handleAddReview = () => {
    if (newReview.comment.trim() === "") return;
    
    const review = {
      id: Date.now(),
      name: "You", // In a real app, you'd get this from user authentication
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      comment: newReview.comment,
      isUserReview: true
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    setShowAddReview(false);
  };

  // Handle deleting a review
  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  // List of similar services based on current service
  const similarServices = [
    {
      id: 1,
      name: "Deep Cleaning Service",
      price: { original: 1999, sale: 1499 },
      image: "/api/placeholder/400/320",
      rating: 4.9,
      reviews: 142,
      discount: "25% OFF"
    },
    {
      id: 2,
      name: "Carpet Cleaning",
      price: { original: 1299, sale: 999 },
      image: "/api/placeholder/400/320",
      rating: 4.7,
      reviews: 89,
      discount: "23% OFF"
    },
    {
      id: 3,
      name: "Window Cleaning",
      price: { original: 999, sale: 799 },
      image: "/api/placeholder/400/320",
      rating: 4.8,
      reviews: 115,
      discount: "20% OFF"
    },
    {
      id: 4,
      name: "Move-in/Move-out Cleaning",
      price: { original: 2499, sale: 1899 },
      image: "/api/placeholder/400/320",
      rating: 4.9,
      reviews: 203,
      discount: "24% OFF"
    },
    {
      id: 5,
      name: "Office Cleaning",
      price: { original: 2299, sale: 1799 },
      image: "/api/placeholder/400/320",
      rating: 4.6,
      reviews: 78,
      discount: "22% OFF"
    },
    {
      id: 6,
      name: "Post-Construction Cleaning",
      price: { original: 2999, sale: 2299 },
      image: "/api/placeholder/400/320",
      rating: 4.8,
      reviews: 56,
      discount: "23% OFF"
    }
  ];

  // Handle viewing similar service details
  const handleViewSimilarService = (service) => {
    // Fixed navigation for similar service
    navigate('/product-details', { 
      state: { service } 
    });
  };

  // Add check to make sure we have initialized selectedSize before rendering the component
  if (!selectedSize && sizes.length > 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8">
            {service.breadcrumbs && service.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {service.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Main content - Left image, right details */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Left column - Image */}
            <div className="relative">
              {service.discount && (
                <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {service.discount}
                </div>
              )}
              <img
                src={service.image?.src || '/api/placeholder/400/320'}
                alt={service.image?.alt || service.name}
                className="w-full rounded-lg object-cover object-center h-96 sm:h-[500px]"
              />

              {/* Description and details under the image */}
              <div className="mt-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Description</h3>
                  <div className="mt-4 space-y-6">
                    <p className="text-base text-gray-900">{service.description}</p>
                  </div>
                </div>

                {service.highlights && service.highlights.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900">Highlights</h3>
                    <div className="mt-4">
                      <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        {service.highlights.map((highlight, index) => (
                          <li key={index} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {service.details && (
                  <div className="mt-8">
                    <h2 className="text-lg font-medium text-gray-900">Important Information</h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">{service.details}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Service info */}
            <div className="mt-10 lg:mt-0 lg:pl-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{service.name}</h1>

              {/* Service time */}
              {service.time && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>⏱️ {service.time}</span>
                </div>
              )}

              {/* Price with discount */}
              <div className="mt-4 flex items-end">
                <p className="text-3xl font-bold tracking-tight text-gray-900">{salePrice}</p>
                <p className="ml-2 text-xl line-through text-gray-500">{originalPrice}</p>
                {service.discount && (
                  <p className="ml-auto text-lg font-medium text-red-600">{service.discount}</p>
                )}
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          averageRating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{averageRating} out of 5 stars</p>
                  <a href="#reviews" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {totalRatings} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10">
                {/* Home Size */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Home Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Sizing help
                    </a>
                  </div>

                  {sizes && sizes.length > 0 && (
                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked ? 'border-indigo-500' : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-md'
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  )}
                </div>

                {/* Date and Time picker */}
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Schedule Service</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service-date" className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        id="service-date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      />
                    </div>
                    <div>
                      <label htmlFor="service-time" className="block text-sm font-medium text-gray-700">Time</label>
                      <select
                        id="service-time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      >
                        <option>Morning (8AM - 12PM)</option>
                        <option>Afternoon (12PM - 4PM)</option>
                        <option>Evening (4PM - 8PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Added quantity selector */}
                <div className="mt-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                  <select
                    id="quantity"
                    name="quantity"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  Add to Cart
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Reviews and Rating Section */}
        <section id="reviews" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mt-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Reviews List - 8/12 width on large screens */}
            <div className="lg:col-span-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Reviews</h3>
                <button 
                  onClick={() => setShowAddReview(!showAddReview)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showAddReview ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {/* Add Review Form */}
              {showAddReview && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                  <h4 className="text-md font-medium mb-2">Share Your Experience</h4>
                  <div className="mb-3 flex items-center">
                    <span className="mr-2">Your Rating:</span>
                    <Rating 
                      value={newReview.rating} 
                      onChange={(_, newValue) => setNewReview({...newReview, rating: newValue || 5})} // Default to 5 if newValue is null
                      precision={1}
                    />
                  </div>
                  <textarea
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    rows="4"
                    placeholder="Write your review here..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  ></textarea>
                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      onClick={handleAddReview}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}

              {/* Scrollable Reviews List */}
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-96 overflow-y-auto bg-white p-4">
                  {reviews.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No reviews yet. Be the first to review!</p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-5 last:border-b-0 last:pb-0">
                          <div className="flex justify-between">
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium text-gray-900">{review.name}</p>
                                {review.isUserReview && (
                                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Your Review</span>
                                )}
                              </div>
                              <div className="mt-1 flex items-center">
                                <Rating name="read-only" value={review.rating} readOnly size="small" />
                                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                            {review.isUserReview && (
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(review.id)}
                                className="text-red-600 hover:text-red-800"
                                aria-label="Delete review"
                              >
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            )}
                          </div>
                          <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Services Section */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Similar Services</h2>
            
            <div className="relative">
              {/* Left scroll button */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => {
                  const container = document.getElementById('similar-services-container');
                  if (container) container.scrollLeft -= 300;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              {/* Services container */}
              <div 
                id="similar-services-container"
                className="flex overflow-x-auto pb-6 gap-5 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {similarServices.map((service) => (
                  <div 
                    key={service.id}
                    className="snap-start min-w-[250px] sm:min-w-[300px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="relative">
                      <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {service.discount}
                      </div>
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="h-48 w-full object-cover" 
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-md font-medium text-gray-900">{service.name}</h3>
                      <div className="mt-2 flex items-center">
                        {[0, 1, 2, 3, 4].map((star) => (
                          <StarIcon
                            key={star}
                            className={classNames(
                              service.rating > star ? 'text-yellow-400' : 'text-gray-200',
                              'h-4 w-4 flex-shrink-0'
                            )}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-500">({service.reviews})</span>
                      </div>
                      <div className="mt-2 flex items-end justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">₹{service.price.sale}</span>
                          <span className="ml-1 text-sm line-through text-gray-500">₹{service.price.original}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewSimilarService(service)}
                        className="mt-4 block w-full py-2 text-center rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
            
              {/* Right scroll button */}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => {
                  const container = document.getElementById('similar-services-container');
                  container.scrollLeft += 300;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Add this style to hide scrollbar across browsers */}
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </section>
      </div>
    </div>
  )
}