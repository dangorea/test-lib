import React, { FC } from 'react';
import { PageLoaderWrapper } from './styles';
import { Loader } from 'wix-style-react';

const PageLoader: FC = () => {
  return (
    <PageLoaderWrapper>
      <Loader size="large" />
    </PageLoaderWrapper>
  );
};

export default PageLoader;
