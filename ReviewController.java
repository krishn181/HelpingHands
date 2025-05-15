package com.HelpingHands.controller;

import com.HelpingHands.exception.ProductException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Rating;
import com.HelpingHands.model.Review;
import com.HelpingHands.model.User;
import com.HelpingHands.request.RatingRequest;
import com.HelpingHands.request.ReviewRequest;
import com.HelpingHands.service.RatingService;
import com.HelpingHands.service.ReviewService;
import com.HelpingHands.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest res,
                                               @RequestHeader("Authorization") String jwt)
            throws UserException, ProductException {
        User user = userService.findUserByJwt(jwt);
        Review review = reviewService.createReview(res,user);

        return  new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @PostMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductsReview(@PathVariable Long productId)
            throws UserException, ProductException{

        List<Review> reviews = reviewService.getAllReview(productId);

        return  new ResponseEntity<>(reviews, HttpStatus.ACCEPTED);
    }

}
