package com.HelpingHands.Repository;

import com.HelpingHands.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query("select o from Order o where o.user.id=:userId and " +
            "(o.orderStatus = 'Placed' or o.orderStatus = 'Confirmed' " +
            "or o.orderStatus='Shipped' or o.orderStatus = 'Delivered')")

    public List<Order> getUsersOrder(@Param("userId") Long userId);
}
