package com.HelpingHands.Repository;

import com.HelpingHands.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query(
            "select p from Product p " +
                    "where (p.category.name = :category OR :category = '') " +
                    "AND ((:minPrice is null AND :maxPrice is null) OR " +
                    "(p.discountedPrice BETWEEN :minPrice AND :maxPrice)) " +
                    "AND (:minDiscount is null OR p.discountedPercent >= :minDiscount) " + // Updated field name
                    "ORDER BY " +
                    "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
                    "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC"
    )
    public List<Product> filterProducts(@Param("category") String category,
                                        @Param("minPrice") Integer minPrice,
                                        @Param("maxPrice") Integer maxPrice,
                                        @Param("minDiscount") Integer minDiscount,
                                        @Param("sort") String sort);

}
