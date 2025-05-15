package com.HelpingHands.service;

import com.HelpingHands.exception.ProductException;
import com.HelpingHands.model.Review;
import com.HelpingHands.model.User;
import com.HelpingHands.request.ReviewRequest;

import java.util.List;

public interface ReviewService {
    public Review createReview(ReviewRequest req, User user)throws ProductException;
    public List<Review> getAllReview(Long productId);

}
