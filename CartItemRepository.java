package com.HelpingHands.Repository;

import com.HelpingHands.model.Cart;
import com.HelpingHands.model.CartItem;
import com.HelpingHands.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query(
            "select ci from CartItem ci where ci.cart = :cart and ci.product = :product " + // Added space before 'and'
                    "and ci.userId = :userId"
    )
    public CartItem isCartItemExist(@Param("cart") Cart cart,
                                    @Param("product") Product product,
                                    @Param("userId") Long userId);
}