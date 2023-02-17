import styled from "styled-components";
import Pagination from "../../../../../Pagination";

export const AddImagesGridWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AddImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: flex-start;
  grid-gap: 15px;
  flex: 1;
  user-select: none;
`;

export const Title = styled.div<{ loading?: string }>`
  position: absolute;
  left: 10px;
  bottom: 5px;
  width: 70%;
  color: ${({ loading }) => loading};
`;

export const AddImagesGridPagination = styled(Pagination)`
  & a {
    color: white !important;
  }
`;

export const UpgradeOverlay = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(160, 73, 188, 0.6);
`;
