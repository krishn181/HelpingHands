
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StripePaymentPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paymentDetails, setPaymentDetails] = useState(null);
  
  // Extract order data passed from checkout
  const orderData = location.state?.orderData;
  const deliveryAddress = location.state?.deliveryAddress;
  const deliveryDate = location.state?.deliveryDate;
  const deliverySlot = location.state?.deliverySlot;
  const amount = location.state?.amount;
  const customerName = location.state?.customerName;
  const customerEmail = location.state?.customerEmail;
  const customerPhone = location.state?.customerPhone;

  useEffect(() => {
    // Log what we received to help with debugging
    console.log("Order ID from params:", orderId);
    console.log("Location state:", location.state);
    
    if (!orderId || !location.state) {
      setError("Missing order information. Please return to checkout.");
      setLoading(false);
      return;
    }

    // Call API to verify payment status
    const verifyPayment = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/payments/${orderId}/status`);
        
        if (response.data.status === 'success') {
          setPaymentStatus('success');
          setPaymentDetails(response.data.details);
        } else if (response.data.status === 'failed') {
          setPaymentStatus('failed');
          setError(response.data.message || 'Payment processing failed. Please try again.');
        } else {
          // Payment is still pending or processing
          // Implement polling or webhook notification here
          setTimeout(verifyPayment, 3000); // Poll every 3 seconds
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Unable to verify payment status. Please contact customer support.');
      } finally {
        setLoading(false);
      }
    };

    // For demo purposes, simulate payment processing
    // In production, replace this with the actual verifyPayment() call
    const timer = setTimeout(() => {
      setPaymentStatus('success');
      setPaymentDetails({
        transactionId: `trx_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'Credit Card',
        paymentDate: new Date().toLocaleString()
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
    // In production: verifyPayment();
  }, [orderId, location.state]);

  // Function to handle retrying checkout
  const handleRetryCheckout = () => {
    navigate('/checkout');
  };

  // Function to go to order history
  const handleViewOrders = () => {
    navigate('/orders');
  };

  // Function to go back to home
  const handleGoHome = () => {
    navigate('/');
  };

  // Function to handle payment retry
  const handleRetryPayment = () => {
    setLoading(true);
    setError(null);
    setPaymentStatus('pending');
    
    // Simulate payment retry
    setTimeout(() => {
      setPaymentStatus('success');
      setPaymentDetails({
        transactionId: `trx_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'Credit Card',
        paymentDate: new Date().toLocaleString()
      });
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin mx-auto h-16 w-16 border-t-4 border-b-4 border-purple-600 rounded-full"></div>
          <h2 className="text-2xl font-semibold mt-4">Processing Payment</h2>
          <p className="text-gray-600 mt-2">Please wait while we process your payment...</p>
          <p className="text-gray-500 text-sm mt-4">This may take a few moments. Please do not close this window.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Payment Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <div className="mt-8 space-x-4">
            <button
              onClick={handleRetryPayment}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Retry Payment
            </button>
            <button
              onClick={handleRetryCheckout}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Return to Checkout
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            If you continue to experience issues, please contact our customer support.
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Payment Failed</h2>
          <p className="text-gray-600 mt-2">Your payment could not be processed.</p>
          <div className="mt-8 space-x-4">
            <button
              onClick={handleRetryPayment}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Try Again
            </button>
            <button
              onClick={handleRetryCheckout}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Change Payment Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {paymentStatus === 'success' ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mt-4">Payment Successful!</h2>
            <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
            <div className="text-gray-600 mt-4">
              <p>Order ID: <span className="font-medium">{orderId}</span></p>
              <p>Amount: <span className="font-medium">₹{amount}</span></p>
              {paymentDetails && (
                <>
                  <p>Transaction ID: <span className="font-medium">{paymentDetails.transactionId}</span></p>
                  <p>Payment Method: <span className="font-medium">{paymentDetails.paymentMethod}</span></p>
                  <p>Date: <span className="font-medium">{paymentDetails.paymentDate}</span></p>
                </>
              )}
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="font-medium text-lg">Order Details</h3>
              
              <div className="mt-4 text-left">
                <div className="mb-4">
                  <h4 className="font-medium">Delivery Address:</h4>
                  <p className="text-gray-600">{deliveryAddress}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium">Delivery Date & Time:</h4>
                  <p className="text-gray-600">{deliveryDate}, {deliverySlot}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Contact:</h4>
                  <p className="text-gray-600">{customerName}</p>
                  <p className="text-gray-600">Phone: +91 {customerPhone}</p>
                  {customerEmail && <p className="text-gray-600">Email: {customerEmail}</p>}
                </div>
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <button
                onClick={handleViewOrders}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                View Orders
              </button>
              <button
                onClick={handleGoHome}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Continue Shopping
              </button>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {customerEmail || 'your registered email address'}.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                For any queries related to your order, please contact our customer support.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-pulse mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mt-4">Payment Processing</h2>
            <p className="text-gray-600 mt-2">Your payment is being processed. Please wait...</p>
            <div className="mt-8">
              <p className="text-gray-500">Order ID: {orderId}</p>
              <p className="text-gray-500">Amount: ₹{amount}</p>
            </div>
            <div className="mt-8">
              <button
                onClick={handleRetryCheckout}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Cancel and Return to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripePaymentPage;