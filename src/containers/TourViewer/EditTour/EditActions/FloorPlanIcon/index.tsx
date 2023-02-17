import React, { FC } from 'react';

type Props = {
  id?: string;
  color?: string;
  width?: number;
  height?: number;
};

const FloorPlanIcon: FC<Props> = ({
  id = 'hotspot-icon',
  color,
  width,
  height,
}) => (
  <svg
    id={id}
    width={width ? `${width}` : '18px'}
    height={height ? `${height}` : '18px'}
    fill={color ? color : 'none'}
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 2V7H6V2H2V10H6V9H7V14H6V11H2V16H9V14H10V16H16V14H18V18H0V0H18V12H16V7H10V12H9V6H16V2H7Z" />
  </svg>
);

export default FloorPlanIcon;
