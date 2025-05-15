import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, Routes, Route } from 'react-router-dom';

import DashBoardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Dummy imports for illustration — replace with your real components
import AdminDashBoard from './Component/AdminDashBoard';
import ProductsTable from './Component/ProductsTable';
import CreateProductForm from './Component/CreateProductForm'
import OrderTable from './Component/OrderTable'
import CustomerTable from './Component/CustomerTable'

const menu = [
  { name: "DashBoard", path: "/admin", icon: <DashBoardIcon /> },
  { name: "Products", path: "/admin/products", icon: <DashBoardIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <DashBoardIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <DashBoardIcon /> },
  { name: "AddProduct", path: "/admin/product/create", icon: <DashBoardIcon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex h-[100vh]">
      <CssBaseline />
      <div className="w-[15%]">{drawer}</div>
      <div className="w-[85%] border border-r-gray-300 h-full">
        <Routes>
          <Route path="/" element={<AdminDashBoard />} />
          <Route path="/product/create" element={<CreateProductForm />} />
          <Route path="/products" element={<ProductsTable/>} />
          <Route path="/orders" element={<OrderTable />} />
          <Route path="/customers" element={<CustomerTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
