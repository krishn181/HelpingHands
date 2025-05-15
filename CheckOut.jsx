import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';

// QR Code SVG Component for UPI
const QRCodeSVG = () => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="white" />
    <g fill="black">
      {/* This is a simplified representation of a QR code */}
      <rect x="20" y="20" width="160" height="160" fill="white" />
      <rect x="40" y="40" width="20" height="20" />
      <rect x="60" y="40" width="20" height="20" />
      <rect x="80" y="40" width="20" height="20" />
      <rect x="40" y="60" width="20" height="20" />
      <rect x="80" y="60" width="20" height="20" />
      <rect x="140" y="40" width="20" height="20" />
      <rect x="140" y="60" width="20" height="20" />
      <rect x="140" y="80" width="20" height="20" />
      <rect x="40" y="80" width="20" height="20" />
      <rect x="60" y="80" width="20" height="20" />
      <rect x="80" y="80" width="20" height="20" />
      <rect x="40" y="100" width="20" height="20" />
      <rect x="60" y="120" width="20" height="20" />
      <rect x="40" y="140" width="20" height="20" />
      <rect x="60" y="140" width="20" height="20" />
      <rect x="80" y="140" width="20" height="20" />
      <rect x="100" y="140" width="20" height="20" />
      <rect x="120" y="140" width="20" height="20" />
      <rect x="140" y="140" width="20" height="20" />
      <rect x="40" y="120" width="20" height="20" />
      <rect x="100" y="40" width="20" height="20" />
      <rect x="120" y="60" width="20" height="20" />
      <rect x="100" y="80" width="20" height="20" />
      <rect x="120" y="100" width="20" height="20" />
      <rect x="120" y="120" width="20" height="20" />
    </g>
  </svg>
);

const Checkout = () => {
  // Get cart items and functions from CartContext
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Define steps for the checkout process
  const steps = [
    { id: 'address', label: 'Address' },
    { id: 'payment', label: 'Payment' },
    { id: 'summary', label: 'Review' }
  ];

  // Current active step state
  const [activeStep, setActiveStep] = useState(0);
  
  // Address states
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Anish Singh',
      phone: '9876543210',
      house: '123',
      street: 'Main Street',
      landmark: 'Near Central Park',
      area: 'Downtown',
      city: 'Mumbai',
      pincode: '400001',
      isDefault: true
    }
  ]);

  // Selected address
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);
  
  // Form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    phone: '',
    house: '',
    street: '',
    landmark: '',
    area: '',
    city: '',
    pincode: '',
    isDefault: true
  });

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [showUpiQR, setShowUpiQR] = useState(false);
  
  // Order states
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Checkboxes for confirmation
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  
  // Form validation errors
  const [errors, setErrors] = useState({});

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);
  
  // Calculate order totals from cart items
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = 10; // Default 10% off
  const discountAmount = Math.round((subtotal * discount) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const deliveryFee = subtotal > 499 ? 0 : 49;
  const total = discountedSubtotal + deliveryFee;
  
  // Get current selected address
  const currentAddress = addresses.find(addr => addr.id === selectedAddress);

  // Navigation functions
  const handleNext = () => {
    if (activeStep === 0 && !selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }

    if (activeStep === 0 && !confirmAddress) {
      alert('Please confirm your delivery address to proceed.');
      return;
    }

    if (activeStep === 1 && !confirmPayment) {
      alert('Please confirm your payment method to proceed.');
      return;
    }

    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
      return;
    }
    
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };
  
  // Form validation functions
  const validatePhone = (phone) => {
    const phoneRegex = /^[1-9][0-9]{9}$/;
    return phoneRegex.test(phone);
  };
  
  const validatePincode = (pincode) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  // Handle address form input changes
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Validation for phone, pincode, and house
    if (name === 'phone' || name === 'pincode' || name === 'house') {
      // Only allow numbers
      if (value && !/^\d*$/.test(value)) {
        return;
      }
    }
    
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field if it was previously invalid
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle card details change
  const handleCardChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces every 4 digits
    if (name === 'number') {
      const sanitized = value.replace(/[^0-9]/g, '');
      const formatted = sanitized.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setCardDetails({
        ...cardDetails,
        [name]: formatted.slice(0, 19) // Limit to 16 digits + 3 spaces
      });
      return;
    }

    // Format expiry date as MM/YY
    if (name === 'expiry') {
      const sanitized = value.replace(/[^0-9]/g, '');
      let formatted = sanitized;
      if (sanitized.length > 2) {
        formatted = sanitized.slice(0, 2) + '/' + sanitized.slice(2, 4);
      }
      setCardDetails({
        ...cardDetails,
        [name]: formatted.slice(0, 5) // Limit to MM/YY format
      });
      return;
    }

    // Limit CVV to 3 digits
    if (name === 'cvv') {
      const sanitized = value.replace(/[^0-9]/g, '');
      setCardDetails({
        ...cardDetails,
        [name]: sanitized.slice(0, 3)
      });
      return;
    }

    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };
  
  // Handle saving a new address
  const handleSaveAddress = () => {
    // Validate form
    const newErrors = {};
    
    if (!newAddress.name) {
      newErrors.name = "Name is required";
    }
    
    if (!newAddress.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(newAddress.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }
    
    if (!newAddress.house) {
      newErrors.house = "House/Flat number is required";
    }
    
    if (!newAddress.street) {
      newErrors.street = "Street is required";
    }
    
    if (!newAddress.city) {
      newErrors.city = "City is required";
    }
    
    if (!newAddress.pincode) {
      newErrors.pincode = "PIN code is required";
    } else if (!validatePincode(newAddress.pincode)) {
      newErrors.pincode = "Enter valid 6-digit PIN code";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create new address with unique ID
    const newAddressItem = {
      ...newAddress,
      id: addresses.length + 1
    };
    
    // If setting as default, update other addresses
    let updatedAddresses = [...addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }
    
    // Add new address to list
    setAddresses([...updatedAddresses, newAddressItem]);
    setSelectedAddress(newAddressItem.id);
    setShowAddressForm(false);
    
    // Reset form
    setNewAddress({
      type: 'Home',
      name: '',
      phone: '',
      house: '',
      street: '',
      landmark: '',
      area: '',
      city: '',
      pincode: '',
      isDefault: true
    });
    
    // Clear errors
    setErrors({});
  };

  // Handle place order
  const handlePlaceOrder = () => {
    setIsLoading(true);

    // Mock order creation
    setTimeout(() => {
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        items: cart,
        totalAmount: total,
        address: currentAddress,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        orderStatus: 'confirmed',
        orderDate: new Date().toISOString()
      };

      // Set order ID
      setOrderId(orderData.orderId);
      
      // Clear cart
      clearCart();
      
      // Navigate to order success page
      navigate('/orders', { state: { orderData } });
      
      setIsLoading(false);
    }, 1500);
  };
  





  // Function to render content based on active step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Select Delivery Address</h3>
            
            {addresses.map(address => (
              <div 
                key={address.id} 
                className={`border rounded-lg p-4 mb-3 cursor-pointer transition-all ${
                  selectedAddress === address.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                }`}
                onClick={() => setSelectedAddress(address.id)}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                        {address.type}
                      </span>
                      <h4 className="font-medium">{address.name}</h4>
                      {address.isDefault && (
                        <span className="ml-2 text-xs text-blue-600">Default</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">
                      {address.house}, {address.street}, {address.landmark && `${address.landmark}, `}
                      {address.area && `${address.area}, `}{address.city} - {address.pincode}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">Phone: +91 {address.phone}</p>
                  </div>
                  <div className="ml-4">
                    <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                      {selectedAddress === address.id && (
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {!showAddressForm ? (
              <button 
                className="flex items-center text-blue-600 font-medium mt-3"
                onClick={() => setShowAddressForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Address
              </button>
            ) : (
              <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-lg mb-4">Add New Address</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={newAddress.name}
                      onChange={handleAddressChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        +91
                      </span>
                      <input
                        type="text"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleAddressChange}
                        maxLength={10}
                        className={`w-full px-3 py-2 border rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                        placeholder="10 digit mobile number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House/Flat No.*</label>
                    <input
                      type="text"
                      name="house"
                      value={newAddress.house}
                      onChange={handleAddressChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.house ? 'border-red-500' : ''
                      }`}
                      placeholder="House/Flat/Floor No."
                    />
                    {errors.house && <p className="text-red-500 text-xs mt-1">{errors.house}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street*</label>
                    <input
                      type="text"
                      name="street"
                      value={newAddress.street}
                      onChange={handleAddressChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.street ? 'border-red-500' : ''
                      }`}
                      placeholder="Street/Society/Colony"
                    />
                    {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={newAddress.landmark}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Near Police Station, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area/Locality</label>
                    <input
                      type="text"
                      name="area"
                      value={newAddress.area}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Area/Locality"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? 'border-red-500' : ''
                      }`}
                      placeholder="City"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code*</label>
                    <input
                      type="text"
                      name="pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                      maxLength={6}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.pincode ? 'border-red-500' : ''
                      }`}
                      placeholder="6-digit PIN code"
                    />
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={handleAddressChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                    <div className="flex space-x-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value="Home"
                          checked={newAddress.type === 'Home'}
                          onChange={handleAddressChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Home</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value="Work"
                          checked={newAddress.type === 'Work'}
                          onChange={handleAddressChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Work</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value="Other"
                          checked={newAddress.type === 'Other'}
                          onChange={handleAddressChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Other</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}

            {currentAddress && (
              <div className="mt-4">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={confirmAddress}
                    onChange={(e) => setConfirmAddress(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">Confirm delivery address</span>
                </label>
              </div>
            )}
          </div>
        );
      
      case 1:
        return (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
            
            <div className="space-y-4">
              {/* Cash on Delivery */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                }`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3">
                    {paymentMethod === 'cod' && (
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="flex items-center flex-1">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Cash on Delivery</h4>
                      <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Payment */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3">
                    {paymentMethod === 'card' && (
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="flex items-center flex-1">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Credit/Debit Card</h4>
                      <p className="text-sm text-gray-600">Pay securely with your card</p>
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="mt-4 pl-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          name="number"
                          value={cardDetails.number}
                          onChange={handleCardChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          name="name"
                          value={cardDetails.name}
                          onChange={handleCardChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                        type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Your card details are secure and encrypted</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* UPI Payment */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                }`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3">
                    {paymentMethod === 'upi' && (
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="flex items-center flex-1">
                    <div className="bg-purple-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">UPI Payment</h4>
                      <p className="text-sm text-gray-600">Pay using Google Pay / PhonePe / Paytm</p>
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'upi' && (
                  <div className="mt-4 pl-8">
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-blue-600 flex items-center text-sm font-medium"
                        onClick={() => setShowUpiQR(!showUpiQR)}
                      >
                        {showUpiQR ? 'Hide QR Code' : 'Show QR Code'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showUpiQR ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
                        </svg>
                      </button>
                    </div>
                    
                    {showUpiQR && (
                      <div className="mt-4 flex flex-col items-center">
                        <QRCodeSVG />
                        <p className="mt-2 text-sm text-gray-600">Scan with any UPI app to pay</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <img src="/api/placeholder/40/40" alt="GooglePay" className="h-10" />
                          <img src="/api/placeholder/40/40" alt="PhonePe" className="h-10" />
                          <img src="/api/placeholder/40/40" alt="Paytm" className="h-10" />
                        </div>
                      </div>
                    )}
                    
                    {/* <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="yourname@upi"
                        />
                        <button className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          Verify
                        </button>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={confirmPayment}
                  onChange={(e) => setConfirmPayment(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">I confirm the payment method selected</span>
              </label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            
            {/* Order Items */}
            <div className="border rounded-lg overflow-hidden mb-4">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h4 className="font-medium">Order Items ({cart.length})</h4>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center p-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image || "/api/placeholder/64/64"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.variant}</p>
                      <div className="flex items-center mt-1">
                        <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
                        <span className="mx-2 text-gray-500">×</span>
                        <p className="text-sm text-gray-700">{item.quantity}</p>
                        <p className="ml-auto text-sm font-medium text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Delivery Address */}
            <div className="border rounded-lg overflow-hidden mb-4">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h4 className="font-medium">Delivery Address</h4>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setActiveStep(0)}
                >
                  Change
                </button>
              </div>
              
              <div className="p-4">
                {currentAddress && (
                  <>
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                        {currentAddress.type}
                      </span>
                      <h4 className="font-medium">{currentAddress.name}</h4>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">
                      {currentAddress.house}, {currentAddress.street}, {currentAddress.landmark && `${currentAddress.landmark}, `}
                      {currentAddress.area && `${currentAddress.area}, `}{currentAddress.city} - {currentAddress.pincode}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">Phone: +91 {currentAddress.phone}</p>
                  </>
                )}
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="border rounded-lg overflow-hidden mb-4">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h4 className="font-medium">Payment Method</h4>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setActiveStep(1)}
                >
                  Change
                </button>
              </div>
              
              <div className="p-4">
                {paymentMethod === 'cod' && (
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Cash on Delivery</h4>
                      <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'card' && (
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Credit/Debit Card</h4>
                      <p className="text-sm text-gray-600">
                        Card ending with {cardDetails.number.slice(-4) || 'XXXX'}
                      </p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'upi' && (
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">UPI Payment</h4>
                      <p className="text-sm text-gray-600">Pay using Google Pay / PhonePe / Paytm</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                index <= activeStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index < activeStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className={`ml-2 text-sm ${index <= activeStep ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              {step.label}
            </span>
            
            {index < steps.length - 1 && (
              <div className={`ml-2 h-0.5 w-12 sm:w-24 ${index < activeStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Step Content */}
          {renderStepContent(activeStep)}
          
          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={activeStep === 0}
              className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                activeStep === 0 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : activeStep === steps.length - 1 ? (
              ' Place Order'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-5 border sticky top-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            
            {/* Items count */}
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Items ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            
            {/* Discount */}
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Discount ({discount}%)</span>
              <span className="text-green-600">-₹{discountAmount}</span>
            </div>
            
            {/* Delivery Fee */}
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-green-600' : 'font-medium'}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center font-medium">
                <span>Total Amount</span>
                <span className="text-lg">₹{total}</span>
              </div>
              <div className="text-green-600 text-xs mt-1">
                You saved ₹{discountAmount} on this order
              </div>
            </div>
            
            {/* Safety & Secure */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure and trusted checkout</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>100% genuine products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;