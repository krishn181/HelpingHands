package com.HelpingHands.controller;

import com.HelpingHands.Repository.OrderRepository;
import com.HelpingHands.exception.OrderException;
import com.HelpingHands.model.Order;
import com.HelpingHands.response.ApiResponse;
import com.HelpingHands.service.OrderService;
import com.HelpingHands.service.UserService;
import com.HelpingHands.enums.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
import com.HelpingHands.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${stripe.api.key}")
    String stripeApiKey;

    @Value("${stripe.success.url}")
    String successUrl;

    @Value("${stripe.cancel.url}")
    String cancelUrl;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Creates a Stripe checkout session for the given order
     */
    @PostMapping("/payment/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt) throws OrderException, StripeException {

        Order order = orderService.findOrderById(orderId);
        try {
            // Initialize Stripe with API key
            Stripe.apiKey = stripeApiKey;

            // Build line items for the session
            SessionCreateParams.LineItem.PriceData.ProductData productData =
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName("Order #" + order.getId())
                            .build();

            SessionCreateParams.LineItem.PriceData priceData =
                    SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("inr")
                            .setUnitAmount(Math.round(order.getTotalPrice() * 100))
                            .setProductData(productData)
                            .build();

            SessionCreateParams.LineItem lineItem =
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(priceData)
                            .build();

            // Create the checkout session
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(successUrl + "/" + orderId + "?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(cancelUrl)
                    .addLineItem(lineItem)
                    .setCustomerEmail(order.getUser().getEmail())
                    .putMetadata("orderId", order.getId().toString())
                    .build();

            Session session = Session.create(params);

            // Create response object
            PaymentLinkResponse res = new PaymentLinkResponse();
            res.setPayment_link_id(session.getId());
            res.setPayment_link_url(session.getUrl());

            return new ResponseEntity<>(res, HttpStatus.CREATED);

        } catch (Exception e) {
            throw new StripeException(e.getMessage());
        }
    }

    /**
     * Updates the order payment information after successful payment
     */
    @GetMapping("/payments")
    public ResponseEntity<ApiResponse> updatePaymentInformation(
            @RequestParam(name = "session_id") String sessionId,
            @RequestParam(name = "order_id") Long orderId) throws OrderException, StripeException {

        Order order = orderService.findOrderById(orderId);

        try {
            // Initialize Stripe with API key
            Stripe.apiKey = stripeApiKey;

            // Retrieve the session to check payment status
            Session session = Session.retrieve(sessionId);

            if ("complete".equals(session.getPaymentStatus())) {
                order.getPaymentDetails().setPaymentId(sessionId);
                order.getPaymentDetails().setStatus("COMPLETED");
                order.setOrderStatus(OrderStatus.PLACED);  // Changed from String to enum
                orderRepository.save(order);
            }

            ApiResponse res = new ApiResponse();
            res.setStatus(true);
            res.setMessage("Your order has been placed successfully");
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            throw new StripeException(e.getMessage());
        }
    }

}