package com.HelpingHands.request;

import javax.validation.constraints.NotNull;

public class ReviewRequest {

    @NotNull(message = "Product ID cannot be null")
    private Long productId;
    private String review;


    public ReviewRequest(){}

    public ReviewRequest(Long productId, String review) {
        this.productId = productId;
        this.review = review;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
