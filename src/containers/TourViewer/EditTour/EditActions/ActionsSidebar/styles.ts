import styled from "styled-components";

export const ActionsSidebarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ActionsSidebarBottomBtns = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > button {
    margin-left: 15px;
  }
`;

export const DeleteWrapper = styled.div`
  flex: 1;
`;
