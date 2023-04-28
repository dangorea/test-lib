import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { Dispatch } from "redux";
import type { PaginationMetadata } from "../../store/types";
import {
  Arrow,
  PaginationContainer,
  PaginationItem,
  PaginationWrapper,
} from "./styles";
import { DOTS, usePagination } from "../../utils/hooks/usePagination";

type Props = {
  requestHandler: (
    page?: number,
    perPage?: number
  ) => (dispatch: Dispatch) => void;
  metadata: PaginationMetadata;
  perPage: number;
};

const Pagination: FC<Props> = ({ requestHandler, metadata, perPage }) => {
  const { totalPages } = metadata;
  const [selected, setSelected] = useState<number>(1);
  const dispatch = useDispatch();

  if ((totalPages && !perPage && !requestHandler) || totalPages < 2) {
    return null;
  }

  useEffect(() => {
    dispatch(
      // @ts-ignore
      requestHandler(undefined, perPage)
    );
  }, [dispatch, perPage, requestHandler]);

  const paginationRange = usePagination({
    currentPage: selected,
    totalCount: totalPages ? totalPages : 1,
    siblingCount: 1,
  });

  const handleChange = ({ page }: { page: number }) => {
    dispatch(
      // @ts-ignore
      requestHandler(page - 1, perPage)
    );
    setSelected(page);
  };

  if (selected > totalPages) {
    handleChange({ page: totalPages });
  }

  return (
    <PaginationWrapper>
      <PaginationContainer>
        <PaginationItem
          className={selected !== 1 ? "" : "disabled"}
          onClick={() => selected !== 1 && handleChange({ page: selected - 1 })}
        >
          {selected !== 1 && <Arrow className="left" />}
        </PaginationItem>
        {paginationRange.map((pgNumber, index) => {
          if (pgNumber === DOTS) {
            return <li key={pgNumber + index}>&#8230;</li>;
          }
          return (
            <PaginationItem
              key={pgNumber}
              className={`${selected === pgNumber ? "selected" : ""} `}
              onClick={() => handleChange({ page: pgNumber as number })}
            >
              {pgNumber}
            </PaginationItem>
          );
        })}
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
