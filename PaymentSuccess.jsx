import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment, getOrderById } from '../State/Payment/Action';
import { Alert, AlertTitle, Grid, CircularProgress, Typography, Paper, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import OrderTracker from '../Customer/Components/Order/OrderTracker';

const PaymentSuccess = () => {
    const [sessionId, setSessionId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams();

    const dispatch = useDispatch();

    const order = useSelector(state => state.order?.order);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const stripeSessionId = urlParams.get("session_id");
        
        const status = urlParams.get("status");

        // If we don't have a session ID from URL, check localStorage for stored order ID
        if (!stripeSessionId && !orderId) {
            const storedOrderId = localStorage.getItem('current_order_id');
            if (storedOrderId) {
                // If we find a stored order ID, we can fetch it without session ID
                dispatch(getOrderById(storedOrderId))
                    .then(() => setLoading(false))
                    .catch(() => setLoading(false));
            }
        } else {
            setSessionId(stripeSessionId || '');
            setPaymentStatus(status || "success"); // Default to success if not provided
            
            if (sessionId && orderId) {
                const data = { 
                    orderId, 
                    sessionId
                };
                
                // Fetch order details
                dispatch(getOrderById(orderId));
                
                // Update payment status with Stripe session ID
                dispatch(updatePayment(data))
                    .then(() => setLoading(false))
                    .catch(() => setLoading(false));
            } else if (orderId) {
                // Just fetch the order if we only have orderId
                dispatch(getOrderById(orderId))
                    .then(() => setLoading(false))
                    .catch(() => setLoading(false));
            }
        }
        
        // Clear the stored order ID after processing
        localStorage.removeItem('current_order_id');
    }, [dispatch, orderId, sessionId]);

    // Display loading state 
    if (loading || !order) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className='px-2 lg:px-36 py-5'>
            <div className='flex flex-col justify-center items-center mb-6'>
                <Alert 
                    variant='filled'
                    severity='success'
                    sx={{mb: 6, width: "fit-content"}}>
                    <AlertTitle>Payment Success!</AlertTitle>
                    Congratulations, your order has been placed.
                </Alert>
            </div>

            <OrderTracker activeStep={1}/>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Order Details
            </Typography>
            
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="body1" gutterBottom>
                    <strong>Order ID:</strong> {orderId || order._id}
                </Typography>
                {sessionId && (
                    <Typography variant="body1" gutterBottom>
                        <strong>Session ID:</strong> {sessionId}
                    </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                    <strong>Status:</strong> {order.orderStatus}
                </Typography>
                <Typography variant="body1">
                    <strong>Total:</strong> ₹{order.totalPrice}
                </Typography>
            </Paper>

            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Items in Your Order
            </Typography>

            {order?.orderItems && order.orderItems.map((item, index) => (
                <Grid container key={index} className='mb-4'>
                    <Grid container item component={Paper} elevation={2} className='p-4'
                        sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Grid item xs={12} md={6}>
                            <div className='flex items-center'>
                                <img 
                                    src={item.product.imageUrl || "/placeholder-image.jpg"} 
                                    alt={item.product.title} 
                                    className="w-[5rem] h-[5rem] object-cover object-top mr-4" 
                                />
                                <div>
                                    <Typography variant="subtitle1">{item.product.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Quantity: {item.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ₹{item.price}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            ))}

            <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Shipping Address
            </Typography>
            
            <Paper elevation={3} sx={{ p: 3 }}>
                {order?.shippingAddress && (
                    <>
                        <Typography variant="body1">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</Typography>
                        <Typography variant="body1">{order.shippingAddress.streetAddress}</Typography>
                        <Typography variant="body1">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</Typography>
                        <Typography variant="body1">{order.shippingAddress.mobile}</Typography>
                    </>
                )}
            </Paper>
        </div>
    );
};

export default PaymentSuccess;