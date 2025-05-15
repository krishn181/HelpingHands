

// Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Use cart and functions from CartContext
  const { cart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);

  // Check if cart is empty
  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-gray-500">Your cart is empty</p>
          <div className="mt-6 text-center">
            <Link to="/" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={`${item.id}-${item.date}-${item.timeSlot}`} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row">
                    {/* Item Image */}
                    <div className="flex-shrink-0 sm:w-24 sm:h-24 mb-4 sm:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 sm:ml-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          {item.size && <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>}
                          <p className="mt-1 text-sm text-gray-500">Date: {item.date}</p>
                          <p className="mt-1 text-sm text-gray-500">Time: {item.timeSlot}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">₹{item.price}</p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-sm text-gray-500 line-through">₹{item.originalPrice}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity and Remove Controls */}
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                            disabled={item.quantity <= 1}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Order Summary - Takes up 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">₹{getTotal()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Taxes</p>
                <p className="font-medium">₹{Math.round(getTotal() * 0.18)}</p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <p className="text-gray-900 font-medium">Total</p>
                <p className="text-xl font-bold">₹{getTotal() + Math.round(getTotal() * 0.18)}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                to="/checkout"
                className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;