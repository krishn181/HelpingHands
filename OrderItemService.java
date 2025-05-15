package com.HelpingHands.service;

import com.HelpingHands.model.OrderItem;
import com.HelpingHands.exception.OrderException;

public interface OrderItemService {

    OrderItem createOrderItem(OrderItem orderItem) throws OrderException;

    OrderItem getOrderItemById(Long id) throws OrderException;

    void deleteOrderItem(Long id) throws OrderException;
}
