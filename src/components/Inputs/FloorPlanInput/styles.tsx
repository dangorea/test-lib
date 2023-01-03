import styled from 'styled-components';

export const ImageTitleLabel = styled.div`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
`;

export const InputContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

export const ImageInput = styled.input<{
  image: string;
}>`
  background: url(${({ image }) => image}) no-repeat scroll 7px 7px transparent;
  padding: 21px 22px 20px 40px;
  height: 29px;
  border: none;
  outline: none;
  display: flex;
  border-bottom: 1px solid #aaaaaa;
  color: white;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.2px;

  &:focus,
  input:focus,
  input {
    color: white;
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.2px;
  }
`;

export const FloorPlansContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 145px;
  width: 340px;
`;

export const ImageListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100px;
  height: 100%;
  overflow: hidden;
  position: relative;

  & > img {
    border-radius: 12px;
    width: 100%;
    max-height: 128px;

    &.active {
      border: 2px solid #0071e0;
    }
  }
`;

export const IconDeleteElement = styled.div`
  display: flex;
  position: absolute;
  align-content: flex-start;
  align-self: flex-start;
  align-items: flex-start;
`;

export const UnlinkBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a41e22;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all ease-in-out;
  &:hover {
    box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.4);
  }
`;

export const SliderContainer = styled.div<{ show: boolean }>`
  grid-area: SliderContainer;
  width: 100%;
  max-height: ${({ show }) => (show ? '150px' : '0')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 0.3s ease-in-out, max-height 0.3s linear,
    width 10s ease-in;

  & .swiper-container {
    cursor: ${({ show }) => (show ? 'pointer' : 'default')};
  }

  & .swiper-wrapper {
    display: flex;
    justify-content: flex-start;
    pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
    cursor: ${({ show }) => (show ? 'pointer' : 'default')};
  }
`;
