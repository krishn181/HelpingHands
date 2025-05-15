import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const salesData = [
  {
    value: '24k',
    label: 'Sales',
    color: 'primary',
    icon: <TrendingUpIcon />,
  },
  {
    value: '12.5k',
    label: 'Customers',
    color: 'success',
    icon: <AccountCircleIcon />,
  },
  {
    value: '1.54k',
    label: 'Products',
    color: 'warning',
    icon: <SettingsCellIcon />,
  },
  {
    value: '44k',
    label: 'Revenue',
    color: 'info',
    icon: <AttachMoneyIcon />,
  },
];

const MonthlyOverview = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: theme.palette.grey[900],
        color: theme.palette.common.white,
        borderRadius: 3,
        boxShadow: 6,
      }}
    >
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small" sx={{ color: theme.palette.grey[300] }}>
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
            <Box component="span" fontWeight="600">
              Total 48.5% growth
            </Box>{' '}
            this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: theme.palette.grey[100],
          },
        }}
      />

      <CardContent>
        <Grid container spacing={3}>
          {salesData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    mr: 2.5,
                    bgcolor: theme.palette[item.color].main,
                    color: theme.palette.common.white,
                    width: 48,
                    height: 48,
                    boxShadow: 3,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="caption" color="grey.400">
                    {item.label}
                  </Typography>
                  <Typography variant="h6" color="common.white">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
