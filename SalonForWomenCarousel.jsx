// import React, { useState } from 'react';

// export default function SalonForWomenCarousel() {
//   const [activeTab, setActiveTab] = useState('women');
//   const [selectedService, setSelectedService] = useState(null);
  
//   // Women's services
//   const womenServices = [
//     {
//       id: 1,
//       name: "Hair Styling",
//       rating: 4.8,
//       reviews: 320,
//       price: 999,
//       discountedPrice: 799,
//       time: "45 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 2,
//       name: "Full Body Waxing",
//       rating: 4.9,
//       reviews: 458,
//       price: 1999,
//       discountedPrice: 1499,
//       time: "90 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 3,
//       name: "Facial & Clean Up",
//       rating: 4.7,
//       reviews: 286,
//       price: 1299,
//       discountedPrice: 999,
//       time: "60 mins",
//       image: "/api/placeholder/200/150"
//     },
//     // {
//     //   id: 4,
//     //   name: "Manicure & Pedicure",
//     //   rating: 4.8,
//     //   reviews: 378,
//     //   price: 1499,
//     //   discountedPrice: 1199,
//     //   time: "75 mins",
//     //   image: "/api/placeholder/200/150"
//     // }
//   ];
  
//   // Men's services
//   const menServices = [
//     {
//       id: 1,
//       name: "Haircut & Styling",
//       rating: 4.7,
//       reviews: 425,
//       price: 499,
//       discountedPrice: 399,
//       time: "30 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 2,
//       name: "Beard Trim & Shaping",
//       rating: 4.8,
//       reviews: 312,
//       price: 399,
//       discountedPrice: 299,
//       time: "20 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 3,
//       name: "Facial & Cleanup",
//       rating: 4.6,
//       reviews: 186,
//       price: 899,
//       discountedPrice: 699,
//       time: "45 mins",
//       image: "/api/placeholder/200/150"
//     },
//     // {
//     //   id: 4,
//     //   name: "Hair Color & Highlights",
//     //   rating: 4.7,
//     //   reviews: 142,
//     //   price: 1299,
//     //   discountedPrice: 999,
//     //   time: "60 mins",
//     //   image: "/api/placeholder/200/150"
//     // }
//   ];
  
//   // Kids' services
//   const kidsServices = [
//     {
//       id: 1,
//       name: "Kids Haircut",
//       rating: 4.9,
//       reviews: 215,
//       price: 399,
//       discountedPrice: 299,
//       time: "20 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 2,
//       name: "Hair Styling for Events",
//       rating: 4.8,
//       reviews: 124,
//       price: 599,
//       discountedPrice: 499,
//       time: "30 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 3,
//       name: "Kids Manicure",
//       rating: 4.7,
//       reviews: 98,
//       price: 399,
//       discountedPrice: 299,
//       time: "25 mins",
//       image: "/api/placeholder/200/150"
//     },
//     // {
//     //   id: 4,
//     //   name: "Hair Spa for Kids",
//     //   rating: 4.8,
//     //   reviews: 76,
//     //   price: 799,
//     //   discountedPrice: 599,
//     //   time: "40 mins",
//     //   image: "/api/placeholder/200/150"
//     // }
//   ];

//   // Determine which services to show based on active tab
//   const getActiveServices = () => {
//     switch(activeTab) {
//       case 'men':
//         return menServices;
//       case 'kids':
//         return kidsServices;
//       default:
//         return womenServices;
//     }
//   };

//   // Get section title based on active tab
//   const getSectionTitle = () => {
//     switch(activeTab) {
//       case 'men':
//         return "Men's Grooming";
//       case 'kids':
//         return "Kids' Salon";
//       default:
//         return "Women's Beauty";
//     }
//   };

//   // Filter options based on active tab
// //   const getFilterOptions = () => {
// //     switch(activeTab) {
// //       case 'men':
// //         return ["Bestseller", "Haircut", "Beard", "Facial", "Hair Color"];
// //       case 'kids':
// //         return ["Bestseller", "Haircut", "Styling", "Spa", "Special Occasions"];
// //       default:
// //         return ["Bestseller", "Hair Services", "Facial & Skin", "Waxing", "Nail Care"];
// //     }
// //   };

//   // Featured package based on active tab
//   const getFeaturedPackage = () => {
//     switch(activeTab) {
//       case 'men':
//         return {
//           title: "Complete Grooming Package",
//           rating: 4.8,
//           reviews: 186,
//           price: 2499,
//           discountedPrice: 1999,
//           description: "Haircut, beard styling, facial, hair spa, and more"
//         };
//       case 'kids':
//         return {
//           title: "Birthday Special Package",
//           rating: 4.9,
//           reviews: 92,
//           price: 1499,
//           discountedPrice: 1199,
//           description: "Haircut, styling, nail art, and party-ready makeup"
//         };
//       default:
//         return {
//           title: "Complete Bridal Package",
//           rating: 4.9,
//           reviews: 126,
//           price: 12999,
//           discountedPrice: 9999,
//           description: "Hair styling, makeup, facial, manicure & pedicure, and more"
//         };
//     }
//   };

//   // Fixed: Changed variable name from 'package' to 'featuredPackage'
//   const featuredPackage = getFeaturedPackage();

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       {/* <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
//         <div className="container mx-auto">
//           <h1 className="font-bold text-lg text-pink-600">GlamSpot</h1>
//         </div>
//       </header> */}

//       {/* Category Tabs */}
//       <div className="bg-white shadow-sm bg-white shadow-sm sticky top-16 z-10">
//         <div className="container mx-auto flex">
//           <button 
//             className={`px-6 py-3 font-medium text-sm ${activeTab === 'women' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('women')}
//           >
//             Women
//           </button>
//           <button 
//             className={`px-6 py-3 font-medium text-sm ${activeTab === 'men' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('men')}
//           >
//             Men
//           </button>
//           <button 
//             className={`px-6 py-3 font-medium text-sm ${activeTab === 'kids' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('kids')}
//           >
//             Kids
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex-grow container mx-auto p-4 mb-16">
//         {/* Hero Section */}
//         <div className="rounded-lg overflow-hidden mb-6">
//           <img src="/api/placeholder/800/300" alt="Salon Services" className="w-full h-40 object-cover" />
//           <div className="bg-white p-4 rounded-b-lg shadow-sm">
//             <h2 className="text-xl font-bold">{getSectionTitle()}</h2>
//             <div className="flex items-center mt-2">
//               <span className="text-yellow-400">★</span>
//               <span className="ml-1 text-sm font-semibold">4.85</span>
//               <span className="ml-1 text-sm text-gray-500">(1,400+ reviews)</span>
//             </div>
//             <button 
//           className="w-1000 px-10 py-3 mt-9 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
//         >
//           Book Service
//         </button>
//           </div>
         
//         </div>

//         {/* Filter Options */}
//         <div className="mb-6 overflow-x-auto">
//           {/* <div className="flex space-x-2">
//             {getFilterOptions().map((filter, index) => (
//               <button key={index} className="whitespace-nowrap px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium">
//                 {filter}
//               </button>
//             ))}
//           </div> */}
//         </div>

//         {/* Section Title */}
//         <div className="mb-4">
//           <h3 className="text-lg font-bold">Popular Services</h3>
//         </div>

//         {/* Service Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {getActiveServices().map(service => (
//             <div 
//               key={service.id} 
//               className="bg-white rounded-lg shadow-sm overflow-hidden"
//               onClick={() => setSelectedService(service)}
//             >
//               <div className="relative">
//                 <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
//                 {/* <button className="absolute top-2 right-2 p-1 bg-white rounded-full">
//                   <span className="text-gray-400">♡</span>
//                 </button> */}
//               </div>
//               <div className="p-4">
//                 <h4 className="font-semibold text-base">{service.name}</h4>
//                 <div className="flex items-center mt-1 mb-2">
//                   <span className="text-yellow-400">★</span>
//                   <span className="ml-1 text-xs font-medium">{service.rating}</span>
//                   <span className="ml-1 text-xs text-gray-500">({service.reviews})</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center text-xs text-gray-500">
//                     <span className="mr-1">⏱️</span>
//                     <span>{service.time}</span>
//                   </div>
//                   <div>
//                     <span className="text-xs line-through text-gray-400">₹{service.price}</span>
//                     <span className="ml-1 font-semibold">₹{service.discountedPrice}</span>
//                   </div>
                 
//                 </div>
//                 <button 
//           className="w-full py-3 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
//         >
//           Book Service
//         </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Featured Section */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold mb-4">Recommended Packages</h3>
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <img src="/api/placeholder/600/200" alt="Special Package" className="w-full h-40 object-cover" />
//             <div className="p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h4 className="font-semibold text-base">{featuredPackage.title}</h4>
//                   <div className="flex items-center mt-1">
//                     <span className="text-yellow-400">★</span>
//                     <span className="ml-1 text-xs font-medium">{featuredPackage.rating}</span>
//                     <span className="ml-1 text-xs text-gray-500">({featuredPackage.reviews})</span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs line-through text-gray-400">₹{featuredPackage.price}</div>
//                   <div className="font-semibold">₹{featuredPackage.discountedPrice}</div>
//                   <button 
//           className="w-500 px-10 py-3 rounded-lg bg-white border-2 border-black font-medium transition-colors 
//           duration-200 hover:bg-black hover:text-white  "
//         >
//           Book Service
//         </button>
//                 </div>
//               </div>
//               <div className="mt-2 text-sm text-gray-600">
//                 {featuredPackage.description}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Book Now Button */}
//       {/* <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
//         <button 
//           className="w-full py-3 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
//         >
//           Book Service
//         </button>
//       </div> */}
//     </div>
//   );
// }import React, { useState } from 'react';import React from 'react';import { useNavigate } from 'react-router-dom';import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
// export default function SalonForWomenCarousel() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('women');
//   const [selectedService, setSelectedService] = useState(null);
  
//   // Women's services
//   const womenServices = [
//     {
//       id: 1,
//       name: "Hair Styling",
//       rating: 4.8,
//       reviews: 320,
//       price: 999,
//       discountedPrice: 799,
//       time: "45 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 2,
//       name: "Full Body Waxing",
//       rating: 4.9,
//       reviews: 458,
//       price: 1999,
//       discountedPrice: 1499,
//       time: "90 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 3,
//       name: "Facial & Clean Up",
//       rating: 4.7,
//       reviews: 286,
//       price: 1299,
//       discountedPrice: 999,
//       time: "60 mins",
//       image: "/api/placeholder/200/150"
//     }
//   ];
  
//   // Men's services
//   const menServices = [
//     {
//       id: 1,
//       name: "Haircut & Styling",
//       rating: 4.7,
//       reviews: 425,
//       price: 499,
//       discountedPrice: 399,
//       time: "30 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 2,
//       name: "Beard Trim & Shaping",
//       rating: 4.8,
//       reviews: 312,
//       price: 399,
//       discountedPrice: 299,
//       time: "20 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 3,
//       name: "Facial & Cleanup",
//       rating: 4.6,
//       reviews: 186,
//       price: 899,
//       discountedPrice: 699,
//       time: "45 mins",
//       image: "/api/placeholder/200/150"
//     }
//   ];
  
//   // Kids' services
//   const kidsServices = [
//     {
//       id: 1,
//       name: "Kids Haircut",
//       rating: 4.9,
//       reviews: 215,
//       price: 399,
//       discountedPrice: 299,
//       time: "20 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 2,
//       name: "Hair Styling for Events",
//       rating: 4.8,
//       reviews: 124,
//       price: 599,
//       discountedPrice: 499,
//       time: "30 mins",
//       image: "/api/placeholder/200/150"
//     },
//     {
//       id: 3,
//       name: "Kids Manicure",
//       rating: 4.7,
//       reviews: 98,
//       price: 399,
//       discountedPrice: 299,
//       time: "25 mins",
//       image: "/api/placeholder/200/150"
//     }
//   ];

//   // Determine which services to show based on active tab
//   const getActiveServices = () => {
//     switch(activeTab) {
//       case 'men':
//         return menServices;
//       case 'kids':
//         return kidsServices;
//       default:
//         return womenServices;
//     }
//   };

//   // Get section title based on active tab
//   const getSectionTitle = () => {
//     switch(activeTab) {
//       case 'men':
//         return "Men's Grooming";
//       case 'kids':
//         return "Kids' Salon";
//       default:
//         return "Women's Beauty";
//     }
//   };

//   // Featured package based on active tab
//   const getFeaturedPackage = () => {
//     switch(activeTab) {
//       case 'men':
//         return {
//           title: "Complete Grooming Package",
//           rating: 4.8,
//           reviews: 186,
//           price: 2499,
//           discountedPrice: 1999,
//           description: "Haircut, beard styling, facial, hair spa, and more"
//         };
//       case 'kids':
//         return {
//           title: "Birthday Special Package",
//           rating: 4.9,
//           reviews: 92,
//           price: 1499,
//           discountedPrice: 1199,
//           description: "Haircut, styling, nail art, and party-ready makeup"
//         };
//       default:
//         return {
//           title: "Complete Bridal Package",
//           rating: 4.9,
//           reviews: 126,
//           price: 12999,
//           discountedPrice: 9999,
//           description: "Hair styling, makeup, facial, manicure & pedicure, and more"
//         };
//     }
//   };

//   const featuredPackage = getFeaturedPackage();

//   // Handle tab change - FIX: Added stopPropagation and replaced button with div
//   const handleTabChange = (tab, e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     setActiveTab(tab);
//     setSelectedService(null); // Reset selected service when changing tabs
//   };
  
//   // Handle booking service - navigate to ProductDetails with service details
//   const handleBookService = (service, e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
    
//     try {
//       // Calculate discount percentage
//       const discountPercentage = Math.round(((service.price - service.discountedPrice) / service.price) * 100);
      
//       // Create formatted service data to pass to ProductDetails page
//       const serviceData = {
//         name: service.name,
//         image: {
//           src: service.image || "/api/placeholder/400/320",
//           alt: `${service.name} service image`
//         },
//         // basePrices: {
//         //   'Studio': { original: service.price, sale: service.discountedPrice },
//         //   '1 BHK': { original: Math.round(service.price * 1.2), sale: Math.round(service.discountedPrice * 1.2) },
//         //   '2 BHK': { original: Math.round(service.price * 1.4), sale: Math.round(service.discountedPrice * 1.4) },
//         //   '3 BHK': { original: Math.round(service.price * 1.6), sale: Math.round(service.discountedPrice * 1.6) },
//         //   '4 BHK': { original: Math.round(service.price * 1.8), sale: Math.round(service.discountedPrice * 1.8) },
//         //   '5+ BHK': { original: Math.round(service.price * 2), sale: Math.round(service.discountedPrice * 2) }
//         // },
//         discount: `${discountPercentage}% OFF`,
//         breadcrumbs: [
//           { id: 1, name: 'Beauty Services', href: '#' },
//           { id: 2, name: activeTab === 'women' ? 'Women\'s Beauty' : 
//                    activeTab === 'men' ? 'Men\'s Grooming' : 'Kids\' Salon', href: '#' }
//         ],
//         description: `Professional ${service.name} service by verified experts`,
//         rating: service.rating,
//         reviews: service.reviews,
//         time: service.time,
//         highlights: [
//           'Trained and certified professionals',
//           'Premium products and techniques',
//           'Hygienic and safe procedures',
//           '100% satisfaction guarantee'
//         ],
//         details: 'Our professionals follow strict hygiene protocols. Please ensure you\'re available at the scheduled time. Service can be customized based on your preferences.'
//       };

//       // Navigate to ProductDetails page with the service data
//       navigate('/productDetailsSalon', { state: { service: serviceData } });
//     } catch (error) {
//       console.error("Navigation error:", error);
//     }
//   };
  
//   // Handle booking package - navigate to ProductDetails with package details
//   const handleBookPackage = (packageDetails, e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
    
//     try {
//       // Calculate discount percentage
//       const discountPercentage = Math.round(((packageDetails.price - packageDetails.discountedPrice) / packageDetails.price) * 100);
      
//       // Create formatted package data to pass to ProductDetails page
//       const serviceData = {
//         name: packageDetails.title,
//         image: {
//           src: "/api/placeholder/600/200",
//           alt: `${packageDetails.title} package image`
//         },
//         // basePrices: {
//         //   'Studio': { original: packageDetails.price * 0.8, sale: packageDetails.discountedPrice * 0.8 },
//         //   '1 BHK': { original: packageDetails.price * 0.9, sale: packageDetails.discountedPrice * 0.9 },
//         //   '2 BHK': { original: packageDetails.price, sale: packageDetails.discountedPrice },
//         //   '3 BHK': { original: packageDetails.price * 1.2, sale: packageDetails.discountedPrice * 1.2 },
//         //   '4 BHK': { original: packageDetails.price * 1.4, sale: packageDetails.discountedPrice * 1.4 },
//         //   '5+ BHK': { original: packageDetails.price * 1.6, sale: packageDetails.discountedPrice * 1.6 }
//         // },
//         discount: `${discountPercentage}% OFF`,
//         breadcrumbs: [
//           { id: 1, name: 'Beauty Services', href: '#' },
//           { id: 2, name: activeTab === 'women' ? 'Women\'s Packages' : 
//                    activeTab === 'men' ? 'Men\'s Packages' : 'Kids\' Packages', href: '#' }
//         ],
//         description: packageDetails.description,
//         rating: packageDetails.rating,
//         reviews: packageDetails.reviews,
//         time: activeTab === 'women' ? "4 hours" :
//               activeTab === 'men' ? "3 hours" : "2 hours",
//         highlights: [
//           'Complete beauty solution',
//           'Premium service guarantee',
//           'Expert technicians',
//           'Priority scheduling'
//         ],
//         details: 'This comprehensive package provides a complete beauty experience. Our team of experts will coordinate with you to ensure the best results.'
//       };

//       // Navigate to ProductDetails page with the package data
//       navigate('/productDetailsSalon', { state: { service: serviceData } });
//     } catch (error) {
//       console.error("Navigation error:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Category Tabs - FIX: Changed buttons to divs with proper onClick handling */}
//       <div className="bg-white shadow-sm sticky top-16 z-10">
//         <div className="container mx-auto flex">
//           <div 
//             className={`px-6 py-3 font-medium text-sm cursor-pointer ${activeTab === 'women' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
//             onClick={(e) => handleTabChange('women', e)}
//           >
//             Women
//           </div>
//           <div 
//             className={`px-6 py-3 font-medium text-sm cursor-pointer ${activeTab === 'men' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
//             onClick={(e) => handleTabChange('men', e)}
//           >
//             Men
//           </div>
//           <div 
//             className={`px-6 py-3 font-medium text-sm cursor-pointer ${activeTab === 'kids' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
//             onClick={(e) => handleTabChange('kids', e)}
//           >
//             Kids
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex-grow container mx-auto p-4 mb-16">
//         {/* Hero Section */}
//         <div className="rounded-lg overflow-hidden mb-6">
//           <img src="/api/placeholder/800/300" alt="Salon Services" className="w-full h-40 object-cover" />
//           <div className="bg-white p-4 rounded-b-lg shadow-sm">
//             <h2 className="text-xl font-bold">{getSectionTitle()}</h2>
//             <div className="flex items-center mt-2">
//               <span className="text-yellow-400">★</span>
//               <span className="ml-1 text-sm font-semibold">4.85</span>
//               <span className="ml-1 text-sm text-gray-500">(1,400+ reviews)</span>
//             </div>
//             <button 
//               className="w-full px-10 py-3 mt-4 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
//               onClick={(e) => handleBookService({
//                 name: getSectionTitle(),
//                 rating: 4.85,
//                 reviews: 1400,
//                 price: activeTab === 'women' ? 1299 : activeTab === 'men' ? 899 : 699,
//                 discountedPrice: activeTab === 'women' ? 999 : activeTab === 'men' ? 699 : 499,
//                 time: activeTab === 'women' ? "60 mins" : activeTab === 'men' ? "45 mins" : "30 mins",
//                 image: "/api/placeholder/800/300"
//               }, e)}
//             >
//               Book Service
//             </button>
//           </div>
//         </div>

//         {/* Section Title */}
//         <div className="mb-4">
//           <h3 className="text-lg font-bold">Popular Services</h3>
//         </div>

//         {/* Service Cards - FIX: Added proper event handling */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {getActiveServices().map(service => (
//             <div 
//               key={service.id} 
//               className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
//               onClick={(e) => setSelectedService(service)}
//             >
//               <div className="relative">
//                 <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
//               </div>
//               <div className="p-4">
//                 <h4 className="font-semibold text-base">{service.name}</h4>
//                 <div className="flex items-center mt-1 mb-2">
//                   <span className="text-yellow-400">★</span>
//                   <span className="ml-1 text-xs font-medium">{service.rating}</span>
//                   <span className="ml-1 text-xs text-gray-500">({service.reviews})</span>
//                 </div>
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center text-xs text-gray-500">
//                     <span className="mr-1">⏱️</span>
//                     <span>{service.time}</span>
//                   </div>
//                   <div>
//                     <span className="text-xs line-through text-gray-400">₹{service.price}</span>
//                     <span className="ml-1 font-semibold">₹{service.discountedPrice}</span>
//                   </div>
//                 </div>
//                 <button 
//                   className="w-full py-2 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent triggering the parent div's onClick
//                     handleBookService(service, e);
//                   }}
//                 >
//                   Book Service
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Featured Section */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold mb-4">Recommended Packages</h3>
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <img src="/api/placeholder/600/200" alt="Special Package" className="w-full h-40 object-cover" />
//             <div className="p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h4 className="font-semibold text-base">{featuredPackage.title}</h4>
//                   <div className="flex items-center mt-1">
//                     <span className="text-yellow-400">★</span>
//                     <span className="ml-1 text-xs font-medium">{featuredPackage.rating}</span>
//                     <span className="ml-1 text-xs text-gray-500">({featuredPackage.reviews})</span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs line-through text-gray-400">₹{featuredPackage.price}</div>
//                   <div className="font-semibold">₹{featuredPackage.discountedPrice}</div>
//                 </div>
//               </div>
//               <div className="mt-2 text-sm text-gray-600">
//                 {featuredPackage.description}
//               </div>
//               <button 
//                 className="w-full py-2 mt-3 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
//                 onClick={(e) => handleBookPackage(featuredPackage, e)}
//               >
//                 Book Package
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// // SalonForWomenCarousel.jsx


import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function SalonForWomenCarousel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('women');
  const [selectedService, setSelectedService] = useState(null);
  
  // Women's services
  const womenServices = [
    {
      id: 1,
      name: "Hair Styling",
      rating: 4.8,
      reviews: 320,
      price: 999,
      discountedPrice: 799,
      time: "45 mins",
      image: "https://plus.unsplash.com/premium_photo-1676677523344-752d69d617cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWVuJTIwaGFpciUyMHN0eWxpbmd8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 2,
      name: "Full Body Waxing",
      rating: 4.9,
      reviews: 458,
      price: 1999,
      discountedPrice: 1499,
      time: "90 mins",
      image: "https://plus.unsplash.com/premium_photo-1661431392914-e3fc8ff0e51a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2F4aW5nfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      name: "Facial & Clean Up",
      rating: 4.7,
      reviews: 286,
      price: 1299,
      discountedPrice: 999,
      time: "60 mins",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjaWFsfGVufDB8fDB8fHww"
    }
  ];
  
  // Men's services
  const menServices = [
    {
      id: 1,
      name: "Haircut & Styling",
      rating: 4.7,
      reviews: 425,
      price: 499,
      discountedPrice: 399,
      time: "30 mins",
      image: "https://plus.unsplash.com/premium_photo-1665203406912-4fbd99560a90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 2,
      name: "Beard Trim & Shaping",
      rating: 4.8,
      reviews: 312,
      price: 399,
      discountedPrice: 299,
      time: "20 mins",
      image: "https://images.unsplash.com/photo-1733995471058-3d6ff2013de3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnMlMjBiZWFyZCUyMHRyaW1pbmclMjBhbmQlMjBzYXZpbmd8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 3,
      name: "Facial & Cleanup",
      rating: 4.6,
      reviews: 186,
      price: 899,
      discountedPrice: 699,
      time: "45 mins",
      image: "https://media.istockphoto.com/id/964912440/photo/man-getting-facial-treatment-at-beauty-salon.webp?a=1&b=1&s=612x612&w=0&k=20&c=dI-otWC4JrvUaDmUQ-elRHv7uQGU2J3lN1TNpTLjMDc="
    }
  ];
  
  // Kids' services
  const kidsServices = [
    {
      id: 1,
      name: "Kids Haircut",
      rating: 4.9,
      reviews: 215,
      price: 399,
      discountedPrice: 299,
      time: "20 mins",
      image: "https://plus.unsplash.com/premium_photo-1661628786615-ecfd8a04a416?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2lkcyUyMGhhaXIlMjBjdXR8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 2,
      name: "Hair Styling for Events",
      rating: 4.8,
      reviews: 124,
      price: 599,
      discountedPrice: 499,
      time: "30 mins",
      image: "https://plus.unsplash.com/premium_photo-1664528356423-50066ad5f8d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2lkcyUyMGhhaXIlMjBzdHlsZWluZyUyMGZvciUyMGV2ZW50fGVufDB8fDB8fHww"
    },
    {
      id: 3,
      name: "Kids Manicure",
      rating: 4.7,
      reviews: 98,
      price: 399,
      discountedPrice: 299,
      time: "25 mins",
      image: "https://images.unsplash.com/photo-1705172516631-8b56622af144?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lkcyUyMG1hbmljdXJlfGVufDB8fDB8fHww"
    }
  ];

  // Determine which services to show based on active tab
  const getActiveServices = () => {
    switch(activeTab) {
      case 'men':
        return menServices;
      case 'kids':
        return kidsServices;
      default:
        return womenServices;
    }
  };

  // Get section title based on active tab
  const getSectionTitle = () => {
    switch(activeTab) {
      case 'men':
        return "Men's Grooming";
      case 'kids':
        return "Kids' Salon";
      default:
        return "Women's Beauty";
    }
  };

  // Featured package based on active tab
  const getFeaturedPackage = () => {
    switch (activeTab) {
      case 'men':
        return {
          title: "Complete Grooming Package",
          rating: 4.8,
          reviews: 186,
          price: 2499,
          discountedPrice: 1999,
          description: "Haircut, beard styling, facial, hair spa, and more",
          image: "data:image/jpeg;base64,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", // Update with real image or leave empty
        };
      case 'kids':
        return {
          title: "Birthday Special Package",
          rating: 4.9,
          reviews: 92,
          price: 1499,
          discountedPrice: 1199,
          description: "Haircut, styling, nail art, and party-ready makeup",
          image: "data:image/jpeg;base64,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",
        };
      default:
        return {
          title: "Complete Bridal Package",
          rating: 4.9,
          reviews: 126,
          price: 12999,
          discountedPrice: 9999,
          description: "Makeup, hair styling, saree draping, and pre-bridal spa",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBNZjmiG18l1rHeV4ghuvzT7YVOwyGl4VQw&s"   };
    }
  };

  const featuredPackage = getFeaturedPackage();

  // Handle tab change
  const handleTabChange = (tab, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveTab(tab);
    setSelectedService(null); // Reset selected service when changing tabs
  };
  
  // Handle booking service - navigate to ProductDetails with service details
  const handleBookService = (service, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      // Calculate discount percentage
      const discountPercentage = Math.round(((service.price - service.discountedPrice) / service.price) * 100);
      
      // Similar services to show in ProductDetailsSalon
      const similarServices = getActiveServices().filter(s => s.name !== service.name).slice(0, 3);
      
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
        breadcrumbs: [
          { id: 1, name: 'Beauty Services', href: '#' },
          { id: 2, name: activeTab === 'women' ? 'Women\'s Beauty' : 
                 activeTab === 'men' ? 'Men\'s Grooming' : 'Kids\' Salon', href: '#' }
        ],
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
        similarServices: similarServices,
        category: activeTab
      };

      // Navigate to ProductDetails page with the service data
      navigate('/salon-details', { state: { service: serviceData } });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  
  // Handle booking package - navigate to ProductDetails with package details
  const handleBookPackage = (packageDetails, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      // Calculate discount percentage
      const discountPercentage = Math.round(((packageDetails.price - packageDetails.discountedPrice) / packageDetails.price) * 100);
      
      // Similar services to show in ProductDetailsSalon
      const similarServices = getActiveServices().slice(0, 3);
      
      // Create formatted package data to pass to ProductDetails page
      const serviceData = {
        id: Math.floor(Math.random() * 1000),
        name: packageDetails.title,
        image: {
          src: "/api/placeholder/600/200",
          alt: `${packageDetails.title} package image`
        },
        basePrices: {
          '2 BHK': { original: packageDetails.price, sale: packageDetails.discountedPrice },
          '3 BHK': { original: Math.round(packageDetails.price * 1.2), sale: Math.round(packageDetails.discountedPrice * 1.2) },
          '4 BHK': { original: Math.round(packageDetails.price * 1.4), sale: Math.round(packageDetails.discountedPrice * 1.4) }
        },
        discount: `${discountPercentage}% OFF`,
        breadcrumbs: [
          { id: 1, name: 'Beauty Services', href: '#' },
          { id: 2, name: activeTab === 'women' ? 'Women\'s Packages' : 
                 activeTab === 'men' ? 'Men\'s Packages' : 'Kids\' Packages', href: '#' }
        ],
        description: packageDetails.description,
        rating: packageDetails.rating,
        reviews: packageDetails.reviews,
        time: activeTab === 'women' ? "4 hours" :
              activeTab === 'men' ? "3 hours" : "2 hours",
        highlights: [
          'Complete beauty solution',
          'Premium service guarantee',
          'Expert technicians',
          'Priority scheduling'
        ],
        details: 'This comprehensive package provides a complete beauty experience. Our team of experts will coordinate with you to ensure the best results.',
        similarServices: similarServices,
        category: activeTab,
        isPackage: true
      };

      // Navigate to ProductDetails page with the package data
      navigate('/salon-details', { state: { service: serviceData } });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Category Tabs */}
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="container mx-auto flex">
          <div 
            className={`px-6 py-3 font-medium text-sm cursor-pointer ${activeTab === 'women' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
            onClick={(e) => handleTabChange('women', e)}
          >
            Women
          </div>
          <div 
            className={`px-6 py-3 font-medium text-sm cursor-pointer ${activeTab === 'men' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
            onClick={(e) => handleTabChange('men', e)}
          >
            Men
          </div>
          <div 
            className={`px-6 py-3 font-medium text-sm cursor-pointer ${activeTab === 'kids' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
            onClick={(e) => handleTabChange('kids', e)}
          >
            Kids
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 mb-16">
        {/* Hero Section
        <div className="rounded-lg overflow-hidden mb-6">
          <img src="/api/placeholder/800/300" alt="Salon Services" className="w-full h-40 object-cover" />
          <div className="bg-white p-4 rounded-b-lg shadow-sm">
            <h2 className="text-xl font-bold">{getSectionTitle()}</h2>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm font-semibold">4.85</span>
              <span className="ml-1 text-sm text-gray-500">(1,400+ reviews)</span>
            </div>
            <button 
              className="w-full px-10 py-3 mt-4 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
              onClick={(e) => handleBookService({
                name: getSectionTitle(),
                rating: 4.85,
                reviews: 1400,
                price: activeTab === 'women' ? 1299 : activeTab === 'men' ? 899 : 699,
                discountedPrice: activeTab === 'women' ? 999 : activeTab === 'men' ? 699 : 499,
                time: activeTab === 'women' ? "60 mins" : activeTab === 'men' ? "45 mins" : "30 mins",
                image: "/api/placeholder/800/300"
              }, e)}
            >
              Book Service
            </button>
          </div>
        </div> */}

        {/* Section Title */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Popular Services</h3>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getActiveServices().map(service => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              onClick={(e) => setSelectedService(service)}
            >
              <div className="relative">
                <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-base">{service.name}</h4>
                <div className="flex items-center mt-1 mb-2">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-xs font-medium">{service.rating}</span>
                  <span className="ml-1 text-xs text-gray-500">({service.reviews})</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-1">⏱️</span>
                    <span>{service.time}</span>
                  </div>
                  <div>
                    <span className="text-xs line-through text-gray-400">₹{service.price}</span>
                    <span className="ml-1 font-semibold">₹{service.discountedPrice}</span>
                  </div>
                </div>
                <button 
                  className="w-full py-2 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent div's onClick
                    handleBookService(service, e);
                  }}
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        {/* <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Recommended Packages</h3>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src="/api/placeholder/600/200" alt="Special Package" className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-base">{featuredPackage.title}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-xs font-medium">{featuredPackage.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({featuredPackage.reviews})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs line-through text-gray-400">₹{featuredPackage.price}</div>
                  <div className="font-semibold">₹{featuredPackage.discountedPrice}</div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {featuredPackage.description}
              </div>
              <button 
                className="w-full py-2 mt-3 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                onClick={(e) => handleBookPackage(featuredPackage, e)}
              >
                Book Package
              </button>
            </div>
          </div>
        </div> */}
        
  <div className="mt-8">
    <h3 className="text-lg font-bold mb-4">Recommended Packages</h3>
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={featuredPackage.image || "/api/placeholder/600/200"}
        alt="Special Package"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-base">{featuredPackage.title}</h4>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-xs font-medium">{featuredPackage.rating}</span>
              <span className="ml-1 text-xs text-gray-500">({featuredPackage.reviews})</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs line-through text-gray-400">₹{featuredPackage.price}</div>
            <div className="font-semibold">₹{featuredPackage.discountedPrice}</div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {featuredPackage.description}
        </div>
        <button
          className="w-full py-2 mt-3 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
          onClick={(e) => handleBookPackage(featuredPackage, e)}
        >
          Book Package
        </button>
      </div>
    </div>
  </div>
      </main>
    </div>
  );
}
