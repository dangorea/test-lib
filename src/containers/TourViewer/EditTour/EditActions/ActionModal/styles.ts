import styled from "styled-components";
// import { Heading } from "wix-style-react";

export const ModalWrapper = styled.div<{
  open: boolean;
}>`
  width: 740px;
  max-width: 100%;
  height: 525px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 50%;
  bottom: 0;
  border: 1px solid;
  border-radius: 12px;
  transform: translateY(-50%) scale(${({ open }) => (open ? "100%" : 0)});
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.2s ease-in-out;
  z-index: 3004;
  padding: 12px 24px;
  background: rgba(21, 21, 31, 0.9);
  box-shadow: -73.8244px 67.4534px 80px rgba(0, 0, 0, 0.07),
    -47.8491px 43.7198px 46.8519px rgba(0, 0, 0, 0.0531481),
    -28.4361px 25.9821px 25.4815px rgba(0, 0, 0, 0.0425185),
    -14.7649px 13.4907px 13px rgba(0, 0, 0, 0.035),
    -6.01532px 5.4962px 6.51852px rgba(0, 0, 0, 0.0274815),
    -1.36712px 1.24914px 3.14815px rgba(0, 0, 0, 0.0168519);
  user-select: none;
  cursor: default;
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 35px;
  top: 35px;
  cursor: pointer;
  color: gray;
  width: 30px;
  height: 30px;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: white;
    border-color: white;

    path {
      fill: #aaa;
      transition: all 0.2s ease-in-out;
    }
  }
`;

export const SidebarTitle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  //transform: translate(168%, 50%);
  transform: translate(85px, 25px);
  color: #fff;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 52px;
  text-align: center;
  letter-spacing: -0.03em;
`;

export const ActionsSidebarContent = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding: 0 0 0 15px;
  height: 100%;
  width: 100%;
`;
