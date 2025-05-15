package com.HelpingHands.controller;

import com.HelpingHands.exception.ProductException;
import com.HelpingHands.model.Product;
import com.HelpingHands.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category, @RequestParam Integer minPrice,
                                                                      @RequestParam Integer maxPrice,@RequestParam Integer minDiscount,
                                                                      @RequestParam String sort,@RequestParam String stock,
                                                                      @RequestParam Integer pageNumber,@RequestParam Integer pageSize
                                                                      ,@RequestParam List<String>service)
    {
        Page<Product> res = productService.getAllProduct(category,service,minPrice,maxPrice,minDiscount,sort,stock,pageSize,pageNumber);

        return  new ResponseEntity<>(res, HttpStatus.ACCEPTED);

    }
    @GetMapping("/products/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException{
        Product product = productService.findProductById(productId);

        return  new ResponseEntity<Product>(product,HttpStatus.ACCEPTED);

    }

//    @GetMapping("/products/search")
//    public ResponseEntity<List<Product>> searchProductHandler(@RequestParam String q){
//        List<Product> products = productService.s
//    }

}
