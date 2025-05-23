package com.HelpingHands.model;


import javax.persistence.Column;

import java.time.LocalDateTime;

public class PaymentInformation {

    @Column(name = "cardHolder_name")
    private String cardHolderName;

    @Column(name = "card_number")

    private String cardNumber;

    @Column(name = "expiration_date")

    private LocalDateTime expirationDate;

    @Column(name = "cvv")
    private String cvv;

    public PaymentInformation(String cardHolderName, String cardNumber, LocalDateTime expirationDate, String cvv) {
        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }

    public PaymentInformation(){

    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
}
