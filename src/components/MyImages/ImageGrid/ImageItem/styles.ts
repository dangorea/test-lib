import styled from "styled-components";
// import trash from "../../../../assets/icons/trash.png";
import PreviewTitle from "../../../PreviewTitle";

export const Select = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const DeleteBtn = styled.div<{ dark?: boolean }>`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 16px;
  height: 20px;
  background: transparent url(${"trash"}) no-repeat scroll center center;
  background-size: 16px 20px;
  filter: ${({ dark }) => dark && "invert(90%)"};
`;

export const ImageTitle = styled(PreviewTitle)`
  display: contents;

  & .view {
    position: absolute;
    left: 10px;
    bottom: 5px;
    width: 70%;
  }

  & .edit {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    z-index: 10;
  }
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
