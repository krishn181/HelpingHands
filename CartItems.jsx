// import React from 'react';

// const CartItems = ({ name, description, stylist, imageUrl, price, originalPrice, discount }) => {
//   return (
//     <div className='p-4 shadow-md border rounded-lg mb-4 bg-white'>
//       <div className="flex flex-col md:flex-row">
//         {/* Image and Details */}
//         <div className="flex items-start flex-1">
//           <div className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden">
//             <img
//               className='w-full h-full object-cover'
//               src={imageUrl || "/api/placeholder/100/100"}
//               alt={name}
//             />
//           </div>
          
//           <div className='ml-4 flex-1'>
//             <h3 className='font-semibold text-gray-800'>{name}</h3>
//             <p className='text-sm text-gray-600'>{description}</p>
//             {stylist && <p className='text-sm text-gray-500 mt-1'>Stylist: {stylist}</p>}
            
//             <div className='flex items-center space-x-3 mt-2'>
//               <span className='font-semibold text-gray-800'>₹{price}</span>
//               {originalPrice && (
//                 <span className='text-gray-400 line-through text-sm'>₹{originalPrice}</span>
//               )}
//               {discount && (
//                 <span className='text-green-600 text-sm font-medium'>{discount}% off</span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Quantity Controls */}
//         <div className='flex items-center justify-between mt-4 md:mt-0'>
//           <div className='flex items-center border rounded-md'>
//             <button 
//               className='px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-l-md'
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
//               </svg>
//             </button>
//             <span className='px-4 py-1 border-l border-r'>1</span>
//             <button 
//               className='px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-r-md'
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
          
//           <button 
//             className='text-red-500 font-medium ml-4 hover:text-red-600 text-sm'
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default CartItems;


import React from 'react';
import { useCart } from './CartContext';

const CartItems = ({ id, name, description, stylist, imageUrl, price, originalPrice, discount, quantity }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className='p-4 shadow-md border rounded-lg mb-4 bg-white'>
      <div className="flex flex-col md:flex-row">
        {/* Image and Details */}
        <div className="flex items-start flex-1">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden">
            <img
              className='w-full h-full object-cover'
              src={imageUrl || "/api/placeholder/100/100"}
              alt={name}
            />
          </div>
          
          <div className='ml-4 flex-1'>
            <h3 className='font-semibold text-gray-800'>{name}</h3>
            <p className='text-sm text-gray-600'>{description}</p>
            {stylist && <p className='text-sm text-gray-500 mt-1'>Stylist: {stylist}</p>}
            
            <div className='flex items-center space-x-3 mt-2'>
              <span className='font-semibold text-gray-800'>₹{price}</span>
              {originalPrice && (
                <span className='text-gray-400 line-through text-sm'>₹{originalPrice}</span>
              )}
              {discount && (
                <span className='text-green-600 text-sm font-medium'>{discount}% off</span>
              )}
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className='flex items-center justify-between mt-4 md:mt-0'>
          <div className='flex items-center border rounded-md'>
            <button 
              className='px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-l-md'
              onClick={() => updateQuantity(id, quantity - 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <span className='px-4 py-1 border-l border-r'>{quantity}</span>
            <button 
              className='px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-r-md'
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <button 
            className='text-red-500 font-medium ml-4 hover:text-red-600 text-sm'
            onClick={() => removeItem(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;