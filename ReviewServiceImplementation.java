package com.HelpingHands.service;


import com.HelpingHands.Repository.ReviewRepository;
import com.HelpingHands.exception.ProductException;
import com.HelpingHands.model.Product;
import com.HelpingHands.model.Review;
import com.HelpingHands.model.User;
import com.HelpingHands.request.ReviewRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService {

    private ReviewRepository reviewRepository;
    private  ProductService productService;

    public ReviewServiceImplementation(ReviewRepository reviewRepository,
                                       ProductService productService){
        this.productService = productService;
        this.reviewRepository = reviewRepository;
    }


    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());
        Review review =  new Review();
        review.setReview(req.getReview());
        review.setUser(user);
        review.setProduct(product);
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReview(Long productId) {

        return reviewRepository.getAllProductsReview(productId);
    }
}
