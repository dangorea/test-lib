import React, { FC, useEffect, useState } from "react";
// import { Pagination as WixPagination } from "wix-style-react";
import { useDispatch } from "react-redux";
import type { PaginationMetadata } from "../../store/types";
import {
  Arrow,
  PaginationContainer,
  PaginationItem,
  PaginationWrapper,
} from "./styles";
import type { Dispatch } from "redux";

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
  const pageNumbers = [...Array(metadata.totalPages + 1).keys()].slice(1);
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
      <PaginationContainer>
        <PaginationItem
          className={selected !== 1 ? "" : "disabled"}
          onClick={() => selected !== 1 && handleChange({ page: selected - 1 })}
        >
          {selected !== 1 && <Arrow className="left" />}
        </PaginationItem>
        {pageNumbers.map((pgNumber) => (
          <PaginationItem
            key={pgNumber}
            className={`${selected === pgNumber ? "selected" : ""} `}
            onClick={() => handleChange({ page: pgNumber })}
          >
            {pgNumber}
          </PaginationItem>
        ))}
        <PaginationItem
          className={selected !== totalPages ? "" : "disabled"}
          onClick={() =>
            selected !== totalPages && handleChange({ page: selected + 1 })
          }
        >
          {selected !== totalPages && <Arrow className="right" />}
        </PaginationItem>
      </PaginationContainer>
    </PaginationWrapper>
  );
};

export default Pagination;
