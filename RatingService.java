package com.HelpingHands.service;

import com.HelpingHands.exception.ProductException;
import com.HelpingHands.model.Rating;
import com.HelpingHands.model.User;
import com.HelpingHands.request.RatingRequest;

import java.util.List;

public interface RatingService {

    public Rating createRating(RatingRequest req, User user)throws ProductException;
    public List<Rating > getProductRating(Long productId);
}
