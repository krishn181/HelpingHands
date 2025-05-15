package com.HelpingHands.service;

import com.HelpingHands.Repository.CategoryRepository;
import com.HelpingHands.Repository.ProductRepository;
import com.HelpingHands.exception.ProductException;
import com.HelpingHands.model.Category;
import com.HelpingHands.model.Product;
import com.HelpingHands.request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImplementation implements ProductService {

    private ProductRepository productRepository;

    private UserService userService;

    private CategoryRepository categoryRepository;

    public ProductServiceImplementation(ProductRepository productRepository,
                                        UserService userService,
                                        CategoryRepository categoryRepository)
    {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product createProduct(CreateProductRequest req) {

        Category topLevel = categoryRepository.findByName(req.getTopLevelCategory());

        if(topLevel == null)
        {
            Category topLevelCategory = new Category();
            topLevelCategory.setName(req.getTopLevelCategory());
            topLevelCategory.setLevel(1);

            topLevel = categoryRepository.save(topLevelCategory);
        }

        // second level category
        Category secondLevel = categoryRepository.findByNameAndParent(req.getSecondLevelCategory(), topLevel.getName());

        if(secondLevel == null)
        {
            Category secondLevelCategory = new Category();
            secondLevelCategory.setName(req.getSecondLevelCategory());
            secondLevelCategory.setLevel(2);
            secondLevelCategory.setParentCategory(topLevel);

            secondLevel = categoryRepository.save(secondLevelCategory);
        }

        Category thirdLevel = categoryRepository.findByNameAndParent(req.getThirdLevelCategory(), secondLevel.getName());

        if(thirdLevel == null)
        {
            Category thirdLevelCategory = new Category();
            thirdLevelCategory.setName(req.getThirdLevelCategory());
            thirdLevelCategory.setLevel(3);
            thirdLevelCategory.setParentCategory(secondLevel);

            thirdLevel = categoryRepository.save(thirdLevelCategory);
        }

        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setCategory(thirdLevel);
        product.setDiscountedPercent(req.getDiscountPercent());
        product.setImgUrl(req.getImageUrl());
        product.setPrice(req.getPrice());
        product.setQuantity(req.getQuantity());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setService(req.getServices());  // Now using the services field

        Product savedProduct = productRepository.save(product);

        return savedProduct;
    }

    @Override
    public String deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);

        productRepository.delete(product);
        return "Product Deleted Successfully";
    }

    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {

        Product product = findProductById(productId);
        if(req.getQuantity() != 0)
        {
            product.setQuantity(req.getQuantity());
        }

        if(req.getService() != null && !req.getService().isEmpty()) {
            product.setService(req.getService());
        }

        if(req.getTitle() != null) {
            product.setTitle(req.getTitle());
        }

        if(req.getDescription() != null) {
            product.setDescription(req.getDescription());
        }

        if(req.getPrice() > 0) {
            product.setPrice(req.getPrice());
        }

        if(req.getDiscountedPrice() > 0) {
            product.setDiscountedPrice(req.getDiscountedPrice());
        }

        if(req.getDiscountedPercent() > 0) {
            product.setDiscountedPercent(req.getDiscountedPercent());
        }

        if(req.getImgUrl() != null) {
            product.setImgUrl(req.getImgUrl());
        }

        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long id) throws ProductException {
        Optional<Product> opt = productRepository.findById(id);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new ProductException("Product not found with id :- "+id);
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return null;
    }

    @Override
    public Page<Product> getAllProduct(String category, List<String> services,
                                       Integer minPrice, Integer maxPrice,
                                       Integer minDiscount, String sort, String stock,
                                       Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        List<Product> products = productRepository.filterProducts(category, minPrice, maxPrice, minDiscount, sort);

        // Filter by services if the list is not empty
        if(services != null && !services.isEmpty())
        {
            products = products.stream()
                    .filter(p -> p.getService() != null &&
                            p.getService().stream().anyMatch(productService ->
                                    services.stream().anyMatch(requestedService ->
                                            requestedService.equalsIgnoreCase(productService))))
                    .collect(Collectors.toList());
        }

        // Filter by stock status
        if(stock != null)
        {
            if(stock.equals("in_stock")){
                products = products.stream()
                        .filter(p -> p.getQuantity() > 0)
                        .collect(Collectors.toList());
            } else if(stock.equals("out_of_stock")) {
                products = products.stream()
                        .filter(p -> p.getQuantity() == 0)
                        .collect(Collectors.toList());
            }
        }

        // Apply pagination
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), products.size());

        if(start > products.size()) {
            return new PageImpl<>(List.of(), pageable, products.size());
        }

        List<Product> pageContent = products.subList(start, end);
        return new PageImpl<>(pageContent, pageable, products.size());
    }
}