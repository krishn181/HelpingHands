package com.HelpingHands.model;

import javax.persistence.*;

@Embeddable
public class PaymentDetails {

    private String paymentMethod;
    private String status;
    private String paymentId; // Stripe Payment ID (e.g., PaymentIntent ID)
    private String paymentIntentId; // Stripe's Payment Intent ID
    private String paymentMethodId; // Stripe's Payment Method ID
    private String stripePaymentStatus; // Status of payment from Stripe (e.g., succeeded, pending)

    public PaymentDetails() {}

    public PaymentDetails(String paymentMethod, String status, String paymentId,
                          String paymentIntentId, String paymentMethodId, String stripePaymentStatus) {
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.paymentId = paymentId;
        this.paymentIntentId = paymentIntentId;
        this.paymentMethodId = paymentMethodId;
        this.stripePaymentStatus = stripePaymentStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public String getStripePaymentStatus() {
        return stripePaymentStatus;
    }

    public void setStripePaymentStatus(String stripePaymentStatus) {
        this.stripePaymentStatus = stripePaymentStatus;
    }
}
