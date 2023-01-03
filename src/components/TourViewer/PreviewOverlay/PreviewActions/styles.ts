import styled from 'styled-components';

export const PreviewActionsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  z-index: 600;

  & > * {
    margin-left: 10px;
  }
`;
