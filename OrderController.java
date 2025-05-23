package com.HelpingHands.controller;

import com.HelpingHands.exception.OrderException;
import com.HelpingHands.exception.UserException;
import com.HelpingHands.model.Address;
import com.HelpingHands.model.Order;
import com.HelpingHands.model.User;
import com.HelpingHands.service.OrderService;
import com.HelpingHands.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress,
                                             @RequestHeader("Authorization") String jwt) throws UserException, OrderException {
        User user = userService.findUserByJwt(jwt);
        Order order = orderService.createOrder(user,shippingAddress);

        return new ResponseEntity<Order>(order,HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistory(
            @RequestHeader("Authorization") String jwt)throws UserException{

        User user = userService.findUserByJwt(jwt);

        List<Order> orders = orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order>findOrderById(
            @PathVariable("id") Long orderId,
            @RequestHeader("Authorization") String jwt)throws UserException, OrderException{

        User user = userService.findUserByJwt(jwt);

      Order order = orderService.findOrderById(user.getId());
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

}
