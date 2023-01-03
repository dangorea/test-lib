import React, { FC } from 'react';
import { Container, Preview } from './styles';

type Props = {
  isSelected?: boolean;
  src: string;
  isLoading?: boolean;
  withoutLaunchIcon?: boolean;
  [prop: string]: any;
};

const PreviewItem: FC<Props> = ({
  children,
  src,
  isSelected,
  isLoading,
  withoutLaunchIcon,
  ...passedProps
}) => {
  return (
    <Container
      isSelected={isSelected}
      isLoading={isLoading}
      withoutLaunchIcon={withoutLaunchIcon}
      {...passedProps}
    >
      <Preview src={src} isLoading={isLoading} />
      {children}
    </Container>
  );
};

export default PreviewItem;
