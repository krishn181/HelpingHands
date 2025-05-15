package com.HelpingHands.request;

import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;

public class CreateProductRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @Min(value = 0, message = "Price must be positive")
    private int price;

    @Min(value = 0, message = "Discounted price must be positive")
    private int discountedPrice;

    @Min(value = 0, message = "Discount percent must be positive")
    private int discountPercent;

    @Min(value = 0, message = "Quantity must be positive")
    private int quantity;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @NotBlank(message = "Top-level category is required")
    private String topLevelCategory;

    private String secondLevelCategory;
    private String thirdLevelCategory;

    private List<String> services = new ArrayList<>();

    public CreateProductRequest(){}

    public CreateProductRequest(String title, String description, int price,
                                int discountedPrice, int discountPercent, int quantity,
                                String imageUrl, String topLevelCategory, String secondLevelCategory,
                                String thirdLevelCategory, List<String> services) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.discountPercent = discountPercent;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.topLevelCategory = topLevelCategory;
        this.secondLevelCategory = secondLevelCategory;
        this.thirdLevelCategory = thirdLevelCategory;
        this.services = services != null ? services : new ArrayList<>();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(int discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public int getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(int discountPercent) {
        this.discountPercent = discountPercent;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTopLevelCategory() {
        return topLevelCategory;
    }

    public void setTopLevelCategory(String topLevelCategory) {
        this.topLevelCategory = topLevelCategory;
    }

    public String getSecondLevelCategory() {
        return secondLevelCategory;
    }

    public void setSecondLevelCategory(String secondLevelCategory) {
        this.secondLevelCategory = secondLevelCategory;
    }

    public String getThirdLevelCategory() {
        return thirdLevelCategory;
    }

    public void setThirdLevelCategory(String thirdLevelCategory) {
        this.thirdLevelCategory = thirdLevelCategory;
    }

    public List<String> getServices() {
        return services;
    }

    public void setServices(List<String> services) {
        this.services = services != null ? services : new ArrayList<>();
    }
}