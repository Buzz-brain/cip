import React from 'react';
import { Outlet } from 'react-router-dom';
import BeneficiaryLayout from './BeneficiaryLayout';

const BeneficiaryRoutes: React.FC = () => {
  return (
    <BeneficiaryLayout>
      <Outlet />
    </BeneficiaryLayout>
  );
};

export default BeneficiaryRoutes;
