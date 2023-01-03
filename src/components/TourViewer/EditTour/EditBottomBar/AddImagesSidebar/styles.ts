import styled from 'styled-components';
import { Heading } from 'wix-style-react';

export const SidebarWrapper = styled.div<{ open: boolean }>`
  transform: translateX(${({ open }) => (open ? 0 : '540px')});
  opacity: ${({ open }) => (open ? 1 : 0)};
  width: 540px;
  max-width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 3004;
  top: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 24px;
  background: linear-gradient(
    to top,
    black 0%,
    black 70px,
    rgba(7, 7, 7, 0.8) 47%,
    rgba(19, 19, 19, 0.8) 100%
  );
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease-in, opacity 0.2s ease-in;
  color: #fff;
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  color: gray;
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 50%;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: white;
    border-color: white;
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export const SidebarTitle = styled(Heading)`
  font-family: 'Lato', sans-serif;
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 52px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

export const SidebarActionsWrapper = styled.div`
  margin-top: 20px;
`;

export const SidebarActions = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const SelectedCount = styled.span`
  color: #0081ff;
  background-color: #fff;
  display: inline-block;
  height: 30px;
  min-width: 30px;
  border-radius: 14px;
  text-align: center;
  line-height: 30px;
  margin-left: 10px;
`;
