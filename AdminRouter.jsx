import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../../Admin';  // Correct import for the Admin component

const AdminRouters = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default AdminRouters;
