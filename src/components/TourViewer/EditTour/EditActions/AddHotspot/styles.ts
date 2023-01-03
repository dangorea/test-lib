import styled from 'styled-components';

export const SvgIconHover = styled.div`
  & #hotspot-icon {
    fill: black;
  }

  &:hover {
    & #hotspot-icon {
      fill: white;
    }
  }
`;

export const UploadBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 0;
  align-items: center;
`;

export const LoadingSpinner = styled.span`
  width: 28px;
  height: 28px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin: 4px 36px;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const TooltipWrapper = styled.span`
  margin: 0 5px 0 5px;
  padding: 5px 0 0 0;
`;

export const IconSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
`;
