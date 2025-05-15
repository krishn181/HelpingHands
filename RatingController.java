package com.HelpingHands.controller;

import com.HelpingHands.exception.ProductException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Rating;
import com.HelpingHands.model.User;
import com.HelpingHands.request.RatingRequest;
import com.HelpingHands.service.RatingService;
import com.HelpingHands.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {
    @Autowired
    private UserService userService;

    @Autowired
    private RatingService ratingService;

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest res,
                                               @RequestHeader ("Authorization") String jwt)
        throws UserException, ProductException{
        User user = userService.findUserByJwt(jwt);
        Rating rating = ratingService.createRating(res,user);

        return  new ResponseEntity<Rating>(rating, HttpStatus.CREATED);
    }

    @PostMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getProductRating(@PathVariable Long productId,
                                                        @RequestHeader ("Authorization") String jwt)
            throws UserException, ProductException{
        User user = userService.findUserByJwt(jwt);
        List<Rating> rating = ratingService.getProductRating(productId);

        return  new ResponseEntity<>(rating, HttpStatus.CREATED);
    }


}
