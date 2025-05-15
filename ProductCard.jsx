// // import React from 'react';
// // import './ProductCard.css';

// // const ProductCard = ({ service }) => {
// //     return (
// //         <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
// //             <div className="h-[20rem] relative">
// //                 <img
// //                     className="h-full w-full object-cover object-left-top"
// //                     src={service.imageUrl}
// //                     alt={service.name}
// //                 />
// //             </div>

// //             <div className="textPart bg-white p-3">
// //                 <div>
// //                     <p className="font-bold opacity-60">Service</p>
// //                     <p>{service.name}</p>
// //                 </div>

// //                 <div className="flex items-center space-x-2 mt-2">
// //                     <p className="font-semibold">₹{service.price}</p>
// //                     <p className="line-through opacity-50">₹{service.price + 1000}</p>
// //                     <p className="text-green-600 font-semibold">{service.discount}% off</p>
// //                 </div>

// //                 <div className="flex items-center space-x-2 mt-2">
// //                     <p className="text-yellow-400 font-semibold">⭐ {service.rating}</p>
// //                     <p className="text-gray-600">({service.ratingCount})</p>
// //                 </div>

// //                 {/* Book Button */}
// //                 <button
// //                     className="w-full mt-4 px-4 py-2 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
// //                 >
// //                     Book Service
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductCard;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ service }) => {
    // Add navigate function to handle redirects
    const navigate = useNavigate();
    
    // If service is passed directly, use it, otherwise try to get from location state
    const location = useLocation();
    const serviceData = service || (location.state && location.state.serviceData);
    
    // If we don't have service data, show a placeholder or fallback
    if (!serviceData) {
        return (
            <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
                <div className="h-[20rem] bg-gray-200 flex items-center justify-center">
                    <p>Service information not available</p>
                </div>
            </div>
        );
    }
    
    // Handle booking button click
    const handleBookNow = () => {
        // Navigate to booking page with service data
        navigate('/product-details', { state: { serviceData } });
    };

    return (
        <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
            <div className="h-[20rem] relative">
                <img
                    className="h-full w-full object-cover object-left-top"
                    src={serviceData.imageUrl}
                    alt={serviceData.name}
                />
            </div>
            
            <div className="textPart bg-white p-3">
                <div>
                    <p className="font-bold opacity-60">Service</p>
                    <p>{serviceData.name}</p>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                    <p className="font-semibold">₹{serviceData.price}</p>
                    <p className="line-through opacity-50">₹{serviceData.price + 1000}</p>
                    <p className="text-green-600 font-semibold">{serviceData.discount}% off</p>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                    <p className="text-yellow-400 font-semibold">⭐ {serviceData.rating}</p>
                    <p className="text-gray-600">({serviceData.ratingCount})</p>
                </div>
                
                {/* Book Button with onClick handler */}
                <button
                    className="w-full mt-4 px-4 py-2 rounded-lg bg-white border-2 border-black font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={handleBookNow}
                >
                    Book Service
                </button>
            </div>
        </div>
    );
};

 export default ProductCard;