import styled from "styled-components";
// import { Input } from "wix-style-react";

export const Actions = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  display: flex;
  z-index: 600;

  & > * {
    margin-left: 10px;
  }
`;

export const RenameWrapper = styled.div<{ focused: boolean }>`
  border-radius: 18px;
  height: 36px;
  cursor: pointer;
  padding: 10px 12px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ focused }) => focused && "padding-left: 6px;"}

  & > * {
    margin-right: 12px;

    &:first-child:first-child {
      padding-left: ${({ focused }) => focused && "6px"};
      box-shadow: none;
      border-color: ${({ focused }) => focused && "white"};
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Title = styled.div`
  transform: translateY(-5%);
`;

// TODO maybe fix here
export const TitleInput = styled("input")`
  &&& > div {
    padding: 0;
  }

  &&& input {
    color: white;
    padding-left: 2px;

    &:focus:focus {
      color: black;
    }
  }
`;
