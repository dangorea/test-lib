import React from 'react';
import { SvgIconHover } from '../AddProducts/styles';
import PremiumBtn from './components/PremiumBtn';
import ProductIcon from '../ProductIcon';

const AddProductsPremiumBtn = () => {
  return (
    <SvgIconHover>
      <PremiumBtn icon={<ProductIcon id="simple-product-icon" />} />
    </SvgIconHover>
  );
};

export default AddProductsPremiumBtn;
