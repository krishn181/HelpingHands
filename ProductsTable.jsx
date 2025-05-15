import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../State/Product/Action';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

const ProductTable = () => {
  const dispatch = useDispatch();
  
  // Fix: Pass a selector function to `useSelector` to get the products data
  const { products } = useSelector(state => state.products); // Assuming products data is in `state.products`

  // Fetch products on component mount
  useEffect(() => {
    const data = {
      category: null,
      minPrice: null,
      maxPrice: null,
      minDiscount: 0,
      sort: 'price_low',
      pageNumber: 1,
      pageSize: 10,
      stock: ''
    };

    dispatch(findProducts(data));
  }, [dispatch]);

  // Check if products are loaded before trying to display them
  if (!products || products.length === 0) {
    return (
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          No Products Available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Product Nutrition Table
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Calories</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Fat&nbsp;(g)</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Carbs&nbsp;(g)</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Dynamically render product data */}
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.calories}</TableCell>
                <TableCell align="right">{product.fat}</TableCell>
                <TableCell align="right">{product.carbs}</TableCell>
                <TableCell align="right">{product.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
