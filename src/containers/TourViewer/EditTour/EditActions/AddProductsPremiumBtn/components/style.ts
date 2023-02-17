import styled from 'styled-components';

export const PremiumBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 21px;
  border: none;
  color: #fff;
  z-index: 600;
  padding: 8px 8px;
  background: #aa4dc8;
  overflow: hidden;
  transition: opacity 0.2s linear, background 0.2s linear;
  user-select: none;

  & > img,
  & > svg {
    fill: white;
  }

  & > img:first-child {
    margin-bottom: 5px;
  }

  &:hover {
    background-color: rgb(78, 183, 245);
  }
`;
