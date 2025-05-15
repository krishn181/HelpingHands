package com.HelpingHands.service;

import com.HelpingHands.Repository.OrderItemRepository;
import com.HelpingHands.exception.OrderException;
import com.HelpingHands.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderItemServiceImplementation implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemServiceImplementation(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public OrderItem getOrderItemById(Long id) throws OrderException {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new OrderException("Order item not found with ID: " + id));
    }

    @Override
    public void deleteOrderItem(Long id) throws OrderException {
        OrderItem item = getOrderItemById(id);
        orderItemRepository.delete(item);
    }
}
