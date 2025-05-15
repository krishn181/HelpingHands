//package com.HelpingHands.request;
//
//public class AddItemRequest {
//
//    private Long productId;
//    private int quantity;
//    private Integer price;
//
//    public AddItemRequest(){}
//
//    public AddItemRequest(Long productId, int quantity, Integer price) {
//        this.productId = productId;
//        this.quantity = quantity;
//        this.price = price;
//    }
//
//    public Long getProductId() {
//        return productId;
//    }
//
//    public void setProductId(Long productId) {
//        this.productId = productId;
//    }
//
//    public int getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(int quantity) {
//        this.quantity = quantity;
//    }
//
//    public Integer getPrice() {
//        return price;
//    }
//
//    public void setPrice(Integer price) {
//        this.price = price;
//    }
//}



package com.HelpingHands.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class AddItemRequest {

    @NotNull(message = "Product ID cannot be null.")
    private Long productId;

    @Positive(message = "Quantity must be greater than zero.")
    private int quantity;

    @Min(value = 0, message = "Price cannot be negative.")
    private Integer price;

    public AddItemRequest() {}

    public AddItemRequest(Long productId, int quantity, Integer price) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
