package com.HelpingHands.service;

import com.HelpingHands.exception.OrderException;
import com.HelpingHands.model.Address;
import com.HelpingHands.model.Order;
import com.HelpingHands.model.User;

import java.util.List;

public interface OrderService  {

    public Order createOrder(User user, Address shippingAddress) throws OrderException;
    public Order findOrderById(Long orderId) throws OrderException;
    public List<Order> usersOrderHistory(Long userId);
    public Order placedOrder(Long orderId) throws OrderException;
    public Order confirmedOrder(Long orderId)throws OrderException;
    public Order shippedOrder(Long orderId)throws OrderException;
    public Order deliveredOrder(Long orderId)throws OrderException;
    public Order cancelOrder(Long orderId)throws OrderException;

    // for admin
    public List<Order> getAllOrders();
    public Order deleteOrder(Long orderId)throws OrderException;




}
