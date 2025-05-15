package com.HelpingHands.controller;

import com.HelpingHands.exception.CartItemException;
import com.HelpingHands.exception.ProductException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Cart;
import com.HelpingHands.model.User;
import com.HelpingHands.request.AddItemRequest;
import com.HelpingHands.service.CartService;
import com.HelpingHands.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.HelpingHands.response.ApiResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")

public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUseCart(@RequestHeader("Authorization")String jwt)throws UserException{
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return  new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req,
                                                     @RequestHeader("Authorization")String jwt
    ) throws UserException, ProductException, CartItemException {
        User user = userService.findUserByJwt(jwt);
        cartService.addCartItem(user.getId(),req);

        ApiResponse res = new ApiResponse();
        res.getMessage();
        res.setStatus(true);

        return new ResponseEntity<>(res,HttpStatus.OK);
    }


}
