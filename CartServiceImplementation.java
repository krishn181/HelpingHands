package com.HelpingHands.service;

import com.HelpingHands.Repository.CartRepository;
import com.HelpingHands.exception.CartItemException;
import com.HelpingHands.exception.ProductException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Cart;
import com.HelpingHands.model.CartItem;
import com.HelpingHands.model.Product;
import com.HelpingHands.model.User;
import com.HelpingHands.request.AddItemRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImplementation implements CartService {

    private final CartRepository cartRepository;
    private final CartItemService cartItemSevice;
    private final ProductService productService;
    private final UserService userService;

    public CartServiceImplementation(CartRepository cartRepository,
                                     CartItemService cartItemSevice, CartItemService cartItemSevice1,
                                     ProductService productService,
                                     UserService userService) {
        this.cartRepository = cartRepository;
        this.cartItemSevice = cartItemSevice1;
        this.productService = productService;
        this.userService = userService;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException, CartItemException, UserException {
        User user = userService.findUserById(userId); // ensure user is valid
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            cart = createCart(user);
        }

        Product product = productService.findProductById(req.getProductId());
        CartItem existingItem = cartItemSevice.isCartItemExist(cart, product, userId);

        if (existingItem == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setCart(cart);
            cartItem.setUserId(userId);
            cartItem.setPrice(product.getPrice() * req.getQuantity());
            cartItem.setDiscountedPrice(product.getDiscountedPrice() * req.getQuantity());

            CartItem createdCartItem = cartItemSevice.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
        } else {
            // Optionally update existing item quantity
            existingItem.setQuantity(existingItem.getQuantity() + req.getQuantity());
            existingItem.setPrice(existingItem.getProduct().getPrice() * existingItem.getQuantity());
            existingItem.setDiscountedPrice(existingItem.getProduct().getDiscountedPrice() * existingItem.getQuantity());
            cartItemSevice.updateCartItem(userId, existingItem.getId(), existingItem);
        }

        return "Item added to cart!";
    }

    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) return null;

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getPrice();
            totalDiscountedPrice += cartItem.getDiscountedPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItem(totalItem);
        cart.setDiscount(totalPrice - totalDiscountedPrice);

        return cartRepository.save(cart);
    }
}
