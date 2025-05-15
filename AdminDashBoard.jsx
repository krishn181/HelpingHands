import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Achievement from './Achivement';
import MonthlyOverview from './MonthlyOverview';
import ProductsTable from './ProductsTable';

const AdminDashBoard = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
  {/* Achievement Card */}
  <Grid item xs={12} md={4}>
    <Achievement />
  </Grid>

  {/* Monthly Overview Card */}
  <Grid item xs={12} md={8}>
    <MonthlyOverview />
  </Grid>



        {/* Products Table */}
        <Grid item xs={12}>
          <ProductsTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashBoard;
