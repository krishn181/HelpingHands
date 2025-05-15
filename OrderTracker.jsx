// import React from 'react';
// import { 
//   CheckCircle, 
//   PersonPin, 
//   Store, 
//   HomeWork, 
//   LocalShipping, 
//   HourglassEmpty
// } from '@mui/icons-material';

// const OrderTracker = ({ activeStep = 1 }) => {
//   const steps = [
//     {
//       label: "Order Placed",
//       description: "Your service request has been received",
//       icon: <HourglassEmpty className="text-gray-600" />
//     },
//     {
//       label: "Professional Assigned",
//       description: "A service professional has been assigned to your request",
//       icon: <PersonPin className="text-gray-600" />
//     },
//     {
//       label: "Left Service Center",
//       description: "Professional has left the service center",
//       icon: <Store className="text-gray-600" />
//     },
//     {
//       label: "En Route",
//       description: "Professional is on the way to your location",
//       icon: <LocalShipping className="text-gray-600" />
//     },
//     {
//       label: "Arrived",
//       description: "Professional has arrived at your location",
//       icon: <HomeWork className="text-gray-600" />
//     }
//   ];

//   return (
//     <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">Track Your Service</h2>
      
//       {/* Mobile View */}
//       <div className="md:hidden">
//         {steps.map((step, index) => {
//           const isCompleted = index < activeStep;
//           const isActive = index === activeStep;
          
//           return (
//             <div key={index} className="flex mb-4 last:mb-0">
//               <div className="flex flex-col items-center mr-4">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                   isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
//                 }`}>
//                   {isCompleted ? (
//                     <CheckCircle className="text-white text-lg" />
//                   ) : (
//                     React.cloneElement(step.icon, { 
//                       className: `text-white text-lg` 
//                     })
//                   )}
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`w-0.5 h-12 ${
//                     isCompleted ? 'bg-green-500' : 'bg-gray-300'
//                   }`}></div>
//                 )}
//               </div>
//               <div className="pt-1">
//                 <p className={`font-medium ${
//                   isCompleted ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-gray-500'
//                 }`}>
//                   {step.label}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">{step.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {/* Desktop View */}
//       <div className="hidden md:block">
//         <div className="flex justify-between items-start">
//           {steps.map((step, index) => {
//             const isCompleted = index < activeStep;
//             const isActive = index === activeStep;
            
//             return (
//               <div key={index} className="flex flex-col items-center relative w-1/5">
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                   isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
//                 }`}>
//                   {isCompleted ? (
//                     <CheckCircle className="text-white text-xl" />
//                   ) : (
//                     React.cloneElement(step.icon, { 
//                       className: `text-white text-xl` 
//                     })
//                   )}
//                 </div>
//                 <p className={`text-center mt-2 font-medium ${
//                   isCompleted ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-gray-500'
//                 }`}>
//                   {step.label}
//                 </p>
//                 <p className="text-xs text-gray-500 text-center mt-1">{step.description}</p>
                
//                 {/* Connector line */}
//                 {index < steps.length - 1 && (
//                   <div className="hidden md:block absolute h-0.5 top-6 w-full left-1/2">
//                     <div className={`h-full ${
//                       isCompleted ? 'bg-green-500' : 'bg-gray-300'
//                     }`}></div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Estimated arrival */}
//       {activeStep >= 3 && activeStep < 4 && (
//         <div className="mt-6 p-3 bg-blue-50 rounded border border-blue-100 flex items-center">
//           <LocalShipping className="text-blue-500 mr-3" />
//           <div>
//             <p className="text-blue-700 font-medium">Professional is on the way</p>
//             <p className="text-blue-600 text-sm">Estimated arrival in 25 minutes</p>
//           </div>
//         </div>
//       )}

//       {/* Professional info - shown when professional is assigned */}
//       {activeStep >= 1 && (
//         <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
//               <img 
//                 src="/api/placeholder/100/100" 
//                 alt="Service Professional" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">Alex Johnson</h3>
//               <p className="text-sm text-gray-600">Professional Cleaner • 4.8 ★</p>
//             </div>
//             <div className="ml-auto">
//               <button className="bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700">
//                 Contact
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderTracker;

import React, { useState, useEffect } from 'react';
import OrderTracker from './OrderTracker';
import { format, parseISO } from 'date-fns';

const OrderTrackerDemo = ({ orderDetails = null }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({
    orderNumber: "OD78921435",
    serviceType: "Home Deep Cleaning",
    scheduledTime: "Today, 2:00 PM - 4:00 PM",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    price: "₹1,299",
    orderTime: new Date().toISOString()
  });

  // Update service details when order details are passed in
  useEffect(() => {
    if (orderDetails) {
      // Generate random order number if needed
      const randomOrderNum = "OD" + Math.floor(Math.random() * 100000000);
      
      // Format times
      const estimatedTime = orderDetails.estimatedDeliveryTime 
        ? format(parseISO(orderDetails.estimatedDeliveryTime), "h:mm a")
        : "2:00 PM";
        
      // Calculate end time (2 hours after estimated time)
      const estimatedDate = orderDetails.estimatedDeliveryTime 
        ? parseISO(orderDetails.estimatedDeliveryTime)
        : new Date();
      const endTime = format(new Date(estimatedDate.getTime() + 2 * 60 * 60 * 1000), "h:mm a");
      
      // Today's date
      const today = format(new Date(), "EEEE, MMMM d");
      
      setServiceDetails({
        orderNumber: orderDetails.id ? `OD${orderDetails.id}${randomOrderNum.substring(3)}` : randomOrderNum,
        serviceType: orderDetails.serviceTitle || "Home Deep Cleaning",
        scheduledTime: `${today}, ${estimatedTime} - ${endTime}`,
        address: "123 Main Street, Apt 4B, New York, NY 10001",
        price: orderDetails.price || "₹1,299",
        orderTime: orderDetails.orderTime || new Date().toISOString()
      });
      
      // Set the active step based on status
      if (orderDetails.status === "on_the_way") {
        // Calculate progress based on order time and expected delivery time
        const orderTime = new Date(orderDetails.orderTime);
        const estimatedDeliveryTime = orderDetails.estimatedDeliveryTime 
          ? new Date(orderDetails.estimatedDeliveryTime)
          : new Date(orderTime.getTime() + 90 * 60 * 1000);
        const now = new Date();
        
        const totalTimeMs = estimatedDeliveryTime.getTime() - orderTime.getTime();
        const elapsedTimeMs = now.getTime() - orderTime.getTime();
        const progressPercentage = Math.min(Math.max(elapsedTimeMs / totalTimeMs, 0), 1);
        
        // Map progress to steps (0-4)
        setActiveStep(Math.min(Math.floor(progressPercentage * 5), 3));
      } else if (orderDetails.status === "delivered") {
        setActiveStep(4); // Completed
      } else if (orderDetails.status === "cancelled") {
        setActiveStep(0); // Order placed but then cancelled
      }
    }
  }, [orderDetails]);

  // Simulate order progression
  const simulateOrderProgress = () => {
    setIsSimulating(true);
    setActiveStep(0);
    
    const intervals = [2000, 3000, 4000, 5000];
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep += 1;
      setActiveStep(currentStep);
      
      if (currentStep >= 4) {
        clearInterval(progressInterval);
        setIsSimulating(false);
      }
    }, intervals[currentStep] || 3000);
    
    return () => clearInterval(progressInterval);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Track Your Service</h1>
          
          <button 
            onClick={simulateOrderProgress}
            disabled={isSimulating}
            className={`py-2 px-4 rounded text-white ${
              isSimulating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSimulating ? 'Simulating...' : 'Simulate Progress'}
          </button>
        </div>
        
        {/* Order details card */}
        <div className="bg-white p-5 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-medium text-gray-900">Order #{serviceDetails.orderNumber}</h2>
              <p className="text-gray-600">{serviceDetails.serviceType}</p>
            </div>
            <div className="text-right">
              <span className="font-medium text-lg">{serviceDetails.price}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Scheduled Time</p>
              <p className="font-medium">{serviceDetails.scheduledTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="font-medium">{serviceDetails.address}</p>
            </div>
          </div>
        </div>
        
        {/* Order tracker component */}
        <OrderTracker activeStep={activeStep} />
        
        {/* Additional information */}
        <div className="bg-white p-5 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Service Details</h2>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Service Includes</h3>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                  <li>• Full house deep cleaning</li>
                  <li>• Kitchen sanitization</li>
                  <li>• Bathroom deep clean</li>
                  <li>• Floor mopping and dusting</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes for Professional</h3>
                <p className="mt-2 text-sm text-gray-700">Please focus on kitchen counters and bathroom. The front door code is 4321.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackerDemo;