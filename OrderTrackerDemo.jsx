import React, { useState, useEffect } from 'react';
import OrderTracker from './OrderTracker';

const OrderTrackerDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({
    orderNumber: "OD78921435",
    serviceType: "Home Deep Cleaning",
    scheduledTime: "Today, 2:00 PM - 4:00 PM",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    price: "₹1,299"
  });

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