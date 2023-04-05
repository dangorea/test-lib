import styled from "styled-components";

export const Drawer = styled.div<{ open: boolean; width: number }>`
  position: fixed;
  top: 0;
  right: ${({ open, width }) => (open ? 0 : -width)}px;
  height: 100%;
  box-shadow: 0 3px 24px 0 rgba(22, 45, 61, 0.18),
    0 8px 8px 0 rgba(22, 45, 61, 0.12);
  z-index: 3004;
  transition: right 0.4s ease 0s;
  width: ${({ width }) => width}px;
  background: #fff;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    right: ${({ open, width }) => (open ? 0 : -width) * 0.3};
    visibility: ${({ open }) => (!open ? "hidden" : "visible")};
    opacity: ${({ open }) => (!open ? "0" : "1")};
    transition: right 0.4s ease 0s, visibility 0.3s linear, opacity 0.3s linear;
    width: 100%;
  }
`;
