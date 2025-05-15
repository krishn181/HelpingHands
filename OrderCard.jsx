// // OrderCard.jsx
// import React from 'react';
// import AdjustIcon from '@mui/icons-material/Adjust';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';

// const OrderCard = ({ status = "on_the_way" }) => {
//   const getStatusDetails = () => {
//     switch (status) {
//       case "on_the_way":
//         return {
//           icon: <AdjustIcon className="text-blue-500" />,
//           text: "Expected Time: 11 AM",
//           color: "text-blue-500"
//         };
//       case "delivered":
//         return {
//           icon: <CheckCircleIcon className="text-green-500" />,
//           text: "Reached Time: 10 AM",
//           color: "text-green-500"
//         };
//       case "cancelled":
//         return {
//           icon: <CancelIcon className="text-red-500" />,
//           text: "Cancelled at 9 AM",
//           color: "text-red-500"
//         };
//       default:
//         return {
//           icon: <AdjustIcon className="text-blue-500" />,
//           text: "Expected Time: 11 AM",
//           color: "text-blue-500"
//         };
//     }
//   };

//   const { icon, text, color } = getStatusDetails();

//   return (
//     <div className="p-4 md:p-5 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="flex items-start gap-3 md:gap-4 flex-grow">
//           <img
//             className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover object-top"
//             src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
//             alt="Service"
//           />
//           <div className="space-y-1 md:space-y-2">
//             <h3 className="font-medium text-gray-900">Cleaning Service</h3>
//             <p className="text-sm text-gray-600">Professional house cleaning service.</p>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mt-2 md:mt-0">
//           <div className="md:mr-6 font-medium text-gray-900">₹200</div>
          
//           <div className="flex items-center gap-2">
//             {icon}
//             <span className={`text-sm ${color}`}>{text}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;

import React from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { formatDistanceToNow, format, parseISO, addMinutes } from 'date-fns';

const OrderCard = ({ 
  status = "on_the_way",
  orderTime = new Date().toISOString(),
  estimatedDeliveryTime = null,
  actualDeliveryTime = null,
  cancelledTime = null,
  serviceImage = "/api/placeholder/100/100",
  serviceTitle = "Cleaning Service",
  serviceDescription = "Professional house cleaning service.",
  price = "₹200",
  onTrackClick
}) => {
  // Parse the times
  const parsedOrderTime = parseISO(orderTime);
  
  // If estimatedDeliveryTime is not provided, calculate it (e.g., 90 minutes from order time)
  const parsedEstimatedTime = estimatedDeliveryTime 
    ? parseISO(estimatedDeliveryTime) 
    : addMinutes(parsedOrderTime, 90);
  
  const parsedActualTime = actualDeliveryTime ? parseISO(actualDeliveryTime) : null;
  const parsedCancelledTime = cancelledTime ? parseISO(cancelledTime) : null;

  const getStatusDetails = () => {
    switch (status) {
      case "on_the_way":
        return {
          icon: <AdjustIcon className="text-blue-500" />,
          text: `Expected: ${format(parsedEstimatedTime, 'h:mm a')}`,
          subtext: `Ordered ${formatDistanceToNow(parsedOrderTime, { addSuffix: true })}`,
          color: "text-blue-500"
        };
      case "delivered":
        return {
          icon: <CheckCircleIcon className="text-green-500" />,
          text: `Completed: ${parsedActualTime ? format(parsedActualTime, 'h:mm a') : 'Unknown'}`,
          subtext: `Ordered ${formatDistanceToNow(parsedOrderTime, { addSuffix: true })}`,
          color: "text-green-500"
        };
      case "cancelled":
        return {
          icon: <CancelIcon className="text-red-500" />,
          text: `Cancelled: ${parsedCancelledTime ? format(parsedCancelledTime, 'h:mm a') : 'Unknown'}`,
          subtext: `Ordered ${formatDistanceToNow(parsedOrderTime, { addSuffix: true })}`,
          color: "text-red-500"
        };
      default:
        return {
          icon: <AdjustIcon className="text-blue-500" />,
          text: `Expected: ${format(parsedEstimatedTime, 'h:mm a')}`,
          subtext: `Ordered ${formatDistanceToNow(parsedOrderTime, { addSuffix: true })}`,
          color: "text-blue-500"
        };
    }
  };

  const { icon, text, subtext, color } = getStatusDetails();

  return (
    <div className="p-4 md:p-5 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 md:gap-4 flex-grow">
          <img
            className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover object-top"
            src={serviceImage}
            alt={serviceTitle}
          />
          <div className="space-y-1 md:space-y-2">
            <h3 className="font-medium text-gray-900">{serviceTitle}</h3>
            <p className="text-sm text-gray-600">{serviceDescription}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 md:mt-0 w-full md:w-auto">
          <div className="md:mr-6 font-medium text-gray-900">{price}</div>
          
          <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
            <div className="flex items-center gap-2">
              {icon}
              <span className={`text-sm ${color}`}>{text}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{subtext}</span>
            
            {status === "on_the_way" && (
              <button 
                onClick={onTrackClick}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Track Order
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;