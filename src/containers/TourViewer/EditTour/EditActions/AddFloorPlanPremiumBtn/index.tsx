import React from 'react';
import { SvgIconHover } from '../AddProducts/styles';
import PremiumBtn from './components/PremiumBtn';
import FloorPlanIcon from '../FloorPlanIcon';

const AddFloorPlanPremiumBtn = () => {
  return (
    <SvgIconHover>
      <PremiumBtn icon={<FloorPlanIcon id="simple-product-icon" />} />
    </SvgIconHover>
  );
};

export default AddFloorPlanPremiumBtn;
