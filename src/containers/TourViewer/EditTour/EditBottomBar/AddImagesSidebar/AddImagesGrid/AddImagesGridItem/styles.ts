import styled from "styled-components";
import trash from "../../../../../../../assets/icons/trash.png";

export const DeleteBtn = styled.div<{ dark?: boolean }>`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 16px;
  height: 20px;
  background: transparent url(${trash}) no-repeat scroll center center;
  background-size: 16px 20px;
  filter: ${({ dark }) => dark && "invert(90%)"};
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ProgressBarWrapper = styled.div`
  position: absolute;
  top: 60%;
  left: 5%;
  width: 90%;
`;

export const Select = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;
