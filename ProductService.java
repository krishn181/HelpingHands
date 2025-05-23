package com.HelpingHands.service;

import com.HelpingHands.exception.ProductException;
import com.HelpingHands.model.Product;
import com.HelpingHands.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest req);

    public String deleteProduct(Long productId)throws ProductException;

    public Product updateProduct(Long productId,Product req) throws ProductException;

    public Product findProductById(Long id)throws ProductException;

    public List<Product> findProductByCategory(String category);

    public Page<Product> getAllProduct(String category,List<String>service,Integer minPrice, Integer maxPrice,
                                       Integer minDiscount,String sort,String stock,Integer pageNumber,Integer pageSize);
}
