package com.HelpingHands.service;

import com.HelpingHands.exception.CartItemException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Cart;
import com.HelpingHands.model.CartItem;
import com.HelpingHands.model.Product;

public interface CartItemService {

    CartItem createCartItem(CartItem cartItem);

    CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;

    CartItem isCartItemExist(Cart cart, Product product, Long userId);

    void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;

    CartItem findCartItemByID(Long cartItemId) throws CartItemException;
}
