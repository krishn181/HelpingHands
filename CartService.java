package com.HelpingHands.service;


import com.HelpingHands.exception.CartItemException;
import com.HelpingHands.exception.ProductException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Cart;
import com.HelpingHands.model.User;
import com.HelpingHands.request.AddItemRequest;
import org.springframework.stereotype.Service;


public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Long userId, AddItemRequest req) throws ProductException, CartItemException, UserException;

    public Cart findUserCart(Long userId);
}
