// // Order.jsx
// import React, { useState } from 'react';
// import OrderCard from './OrderCard';
// import OrderTrackerDemo from './OrderTrackerDemo';

// const orderStatus = [
//   { label: 'On the way', value: 'on_the_way' },
//   { label: 'Delivered', value: 'delivered' },
//   { label: 'Cancelled', value: 'cancelled' },
// ];

// const demoOrders = [
//   { id: 1, status: 'on_the_way' },
//   { id: 2, status: 'delivered' },
//   { id: 3, status: 'on_the_way' },
//   { id: 4, status: 'cancelled' },
//   { id: 5, status: 'delivered' },
// ];

// const Order = () => {
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showTracker, setShowTracker] = useState(false);

//   const handleFilterChange = (value) => {
//     if (selectedFilters.includes(value)) {
//       setSelectedFilters(selectedFilters.filter(item => item !== value));
//     } else {
//       setSelectedFilters([...selectedFilters, value]);
//     }
//   };

//   const filteredOrders = selectedFilters.length === 0
//     ? demoOrders
//     : demoOrders.filter(order => selectedFilters.includes(order.status));

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//     setShowTracker(true);
//   };

//   const handleBackToOrders = () => {
//     setShowTracker(false);
//   };

//   const FilterSection = () => (
//     <div className="bg-white rounded-lg p-4 md:p-5 shadow-md sticky top-5">
//       <h2 className="font-bold text-lg text-gray-900 mb-6">Filters</h2>
      
//       <div>
//         <h3 className="uppercase font-medium text-sm text-gray-500 tracking-wide mb-3">Order Status</h3>
//         <div className="space-y-3">
//           {orderStatus.map((option) => (
//             <div className="flex items-center" key={option.value}>
//               <input
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 id={option.value}
//                 checked={selectedFilters.includes(option.value)}
//                 onChange={() => handleFilterChange(option.value)}
//               />
//               <label htmlFor={option.value} className="ml-3 text-sm text-gray-700 cursor-pointer">
//                 {option.label}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen pb-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
//         {showTracker ? (
//           <>
//             <div className="flex items-center mb-6">
//               <button 
//                 onClick={handleBackToOrders}
//                 className="flex items-center text-blue-600 hover:text-blue-800"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                 </svg>
//                 Back to Orders
//               </button>
//             </div>
//             <OrderTrackerDemo />
//           </>
//         ) : (
//           <>
//             <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>
            
//             {/* Mobile filter button */}
//             <div className="md:hidden mb-4">
//               <button
//                 onClick={() => setMobileFilterVisible(!mobileFilterVisible)}
//                 className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 {mobileFilterVisible ? 'Hide Filters' : 'Show Filters'}
//               </button>
//             </div>
            
//             <div className="flex flex-col md:flex-row gap-6">
//               {/* Mobile filter - conditionally shown */}
//               {mobileFilterVisible && (
//                 <div className="md:hidden w-full mb-4">
//                   <FilterSection />
//                 </div>
//               )}
              
//               {/* Desktop filter - always visible on larger screens */}
//               <div className="hidden md:block md:w-1/4 lg:w-1/5">
//                 <FilterSection />
//               </div>
              
//               {/* Orders list */}
//               <div className="w-full md:w-3/4 lg:w-4/5">
//                 {filteredOrders.length > 0 ? (
//                   <div className="space-y-4">
//                     {filteredOrders.map((order) => (
//                       <div 
//                         key={order.id}
//                         onClick={() => handleOrderClick(order)}
//                         className="cursor-pointer"
//                       >
//                         <OrderCard status={order.status} />
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="bg-white rounded-lg p-8 text-center shadow-md">
//                     <p className="text-gray-600">No orders match your filter criteria.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Order;

// Order.jsx
import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import OrderTrackerDemo from './OrderTrackerDemo';
import { addMinutes, subMinutes } from 'date-fns';

const orderStatus = [
  { label: 'On the way', value: 'on_the_way' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

// Generate dynamic demo orders with realistic timestamps
const generateDemoOrders = () => {
  const now = new Date();
  
  return [
    { 
      id: 1, 
      status: 'on_the_way', 
      orderTime: subMinutes(now, 45).toISOString(),
      estimatedDeliveryTime: addMinutes(now, 45).toISOString(),
      serviceTitle: "Home Deep Cleaning",
      serviceDescription: "Professional home cleaning service with sanitization",
      price: "₹1,299",
      serviceImage: "/api/placeholder/100/100"
    },
    { 
      id: 2, 
      status: 'delivered', 
      orderTime: subMinutes(now, 180).toISOString(),
      estimatedDeliveryTime: subMinutes(now, 60).toISOString(),
      actualDeliveryTime: subMinutes(now, 70).toISOString(),
      serviceTitle: "Office Sanitization",
      serviceDescription: "Complete workspace disinfection and cleaning",
      price: "₹2,499",
      serviceImage: "/api/placeholder/100/100"
    },
    { 
      id: 3, 
      status: 'on_the_way',
      orderTime: subMinutes(now, 15).toISOString(),
      estimatedDeliveryTime: addMinutes(now, 75).toISOString(),
      serviceTitle: "Kitchen Deep Clean",
      serviceDescription: "Deep cleaning of kitchen appliances and surfaces",
      price: "₹899",
      serviceImage: "/api/placeholder/100/100"
    },
    { 
      id: 4, 
      status: 'cancelled',
      orderTime: subMinutes(now, 120).toISOString(),
      cancelledTime: subMinutes(now, 110).toISOString(),
      serviceTitle: "Carpet Cleaning",
      serviceDescription: "Professional carpet cleaning and stain removal",
      price: "₹799",
      serviceImage: "/api/placeholder/100/100"
    },
    { 
      id: 5, 
      status: 'delivered',
      orderTime: subMinutes(now, 300).toISOString(),
      estimatedDeliveryTime: subMinutes(now, 180).toISOString(),
      actualDeliveryTime: subMinutes(now, 190).toISOString(), 
      serviceTitle: "Bathroom Sanitization",
      serviceDescription: "Complete bathroom cleaning and disinfection",
      price: "₹699",
      serviceImage: "/api/placeholder/100/100"
    },
  ];
};

const Order = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTracker, setShowTracker] = useState(false);
  const [demoOrders, setDemoOrders] = useState([]);
  
  // Initialize demo orders
  useEffect(() => {
    setDemoOrders(generateDemoOrders());
  }, []);

  const handleFilterChange = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter(item => item !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const filteredOrders = selectedFilters.length === 0
    ? demoOrders
    : demoOrders.filter(order => selectedFilters.includes(order.status));

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowTracker(true);
  };

  const handleBackToOrders = () => {
    setShowTracker(false);
  };

  // Add a new order (simulated)
  const addNewOrder = () => {
    const now = new Date();
    const newOrder = {
      id: demoOrders.length + 1,
      status: 'on_the_way',
      orderTime: now.toISOString(),
      estimatedDeliveryTime: addMinutes(now, 90).toISOString(),
      serviceTitle: "Express Cleaning",
      serviceDescription: "Quick cleaning service for your space",
      price: "₹599",
      serviceImage: "/api/placeholder/100/100"
    };
    
    setDemoOrders([newOrder, ...demoOrders]);
  };

  const FilterSection = () => (
    <div className="bg-white rounded-lg p-4 md:p-5 shadow-md sticky top-5">
      <h2 className="font-bold text-lg text-gray-900 mb-6">Filters</h2>
      
      <div>
        <h3 className="uppercase font-medium text-sm text-gray-500 tracking-wide mb-3">Order Status</h3>
        <div className="space-y-3">
          {orderStatus.map((option) => (
            <div className="flex items-center" key={option.value}>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                id={option.value}
                checked={selectedFilters.includes(option.value)}
                onChange={() => handleFilterChange(option.value)}
              />
              <label htmlFor={option.value} className="ml-3 text-sm text-gray-700 cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {showTracker ? (
          <>
            <div className="flex items-center mb-6">
              <button 
                onClick={handleBackToOrders}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Orders
              </button>
            </div>
            <OrderTrackerDemo orderDetails={selectedOrder} />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
              
              {/* Demo button to add a new order */}
              <button
                onClick={addNewOrder}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                + Place New Order
              </button>
            </div>
            
            {/* Mobile filter button */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setMobileFilterVisible(!mobileFilterVisible)}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {mobileFilterVisible ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Mobile filter - conditionally shown */}
              {mobileFilterVisible && (
                <div className="md:hidden w-full mb-4">
                  <FilterSection />
                </div>
              )}
              
              {/* Desktop filter - always visible on larger screens */}
              <div className="hidden md:block md:w-1/4 lg:w-1/5">
                <FilterSection />
              </div>
              
              {/* Orders list */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                {filteredOrders.length > 0 ? (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div 
                        key={order.id}
                        className="cursor-pointer"
                      >
                        <OrderCard 
                          status={order.status}
                          orderTime={order.orderTime}
                          estimatedDeliveryTime={order.estimatedDeliveryTime}
                          actualDeliveryTime={order.actualDeliveryTime}
                          cancelledTime={order.cancelledTime}
                          serviceTitle={order.serviceTitle}
                          serviceDescription={order.serviceDescription}
                          price={order.price}
                          serviceImage={order.serviceImage}
                          onTrackClick={() => handleOrderClick(order)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center shadow-md">
                    <p className="text-gray-600">No orders match your filter criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;