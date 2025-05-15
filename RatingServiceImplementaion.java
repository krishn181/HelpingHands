package com.HelpingHands.service;


import com.HelpingHands.Repository.RatingRepository;
import com.HelpingHands.exception.ProductException;
import com.HelpingHands.model.Product;
import com.HelpingHands.model.Rating;
import com.HelpingHands.model.User;
import com.HelpingHands.request.RatingRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImplementaion implements RatingService {

    private RatingRepository ratingRepository;
    private ProductService productService;

    public RatingServiceImplementaion(RatingRepository ratingRepository,
                                      ProductService productService){
        this.ratingRepository = ratingRepository;
        this.productService = productService;

    }


    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());
        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setRating(req.getRating());
        rating.setUser(user);
        rating.setCreatedAt(LocalDateTime.now());


        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getProductRating(Long productId) {

        return ratingRepository.getAllProductsRating(productId);
    }
}
