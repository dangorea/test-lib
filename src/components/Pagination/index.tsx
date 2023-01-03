import React, { FC, useEffect, useState } from 'react';
import { Pagination as WixPagination } from 'wix-style-react';
import { useDispatch } from 'react-redux';
import type { PaginationMetadata } from '../../store/types';
import { PaginationWrapper } from './styles';
import type { Dispatch } from 'redux';

type Props = {
  requestHandler: (
    page?: number,
    perPage?: number
  ) => (dispatch: Dispatch) => void;
  metadata: PaginationMetadata;
  perPage?: number;
  className?: string;
};

const Pagination: FC<Props> = ({
  requestHandler,
  metadata,
  perPage,
  className,
}) => {
  const [selected, setSelected] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestHandler(undefined, perPage));
  }, [dispatch, perPage, requestHandler]);

  if (!metadata) {
    return null;
  }

  const totalPages = metadata.totalPages || 1;

  const handleChange = ({ page }: { page: number }) => {
    dispatch(requestHandler(page - 1, perPage));
    setSelected(page);
  };

  if (selected > totalPages) {
    handleChange({ page: totalPages });
  }

  if (metadata.totalPages < 2) {
    return null;
  }

  return (
    <PaginationWrapper className={className}>
      <WixPagination
        currentPage={selected}
        totalPages={totalPages}
        onChange={handleChange}
      />
    </PaginationWrapper>
  );
};

export default Pagination;
