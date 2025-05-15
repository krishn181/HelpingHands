package com.HelpingHands.service;

import com.HelpingHands.Repository.CartItemRepository;
import com.HelpingHands.Repository.CartRepository;
import com.HelpingHands.exception.CartItemException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Cart;
import com.HelpingHands.model.CartItem;
import com.HelpingHands.model.Product;
import com.HelpingHands.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImplementation implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final CartRepository cartRepository;

    @Autowired
    public CartItemServiceImplementation(CartItemRepository cartItemRepository,
                                         UserService userService,
                                         CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem updatedItem)
            throws CartItemException, UserException {

        CartItem item = findCartItemByID(id);
        User user = userService.findUserById(item.getUserId());

        if (!user.getId().equals(userId)) {
            throw new UserException("You are not authorized to update this cart item.");
        }

        if (updatedItem.getQuantity() <= 0) {
            throw new CartItemException("Quantity must be greater than 0.");
        }

        item.setQuantity(updatedItem.getQuantity());
        item.setPrice(item.getQuantity() * item.getProduct().getPrice());
        item.setDiscountedPrice(item.getQuantity() * item.getProduct().getDiscountedPrice());

        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, Long userId) {
        return cartItemRepository.isCartItemExist(cart, product, userId);
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemByID(cartItemId);
        User itemOwner = userService.findUserById(cartItem.getUserId());

        if (!itemOwner.getId().equals(userId)) {
            throw new UserException("You can't remove another user's item.");
        }

        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public CartItem findCartItemByID(Long cartItemId) throws CartItemException {
        return cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemException("Cart Item not found with ID: " + cartItemId));
    }
}
