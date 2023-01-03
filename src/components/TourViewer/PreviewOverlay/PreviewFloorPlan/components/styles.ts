import styled from 'styled-components';

export const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 525px;
`;

export const AccordionWrap = styled.button`
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  transition: background-color 0.6s ease;
`;

export const AccordionTitle = styled.p<{ isImage?: boolean }>`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  outline: none;
  border: none;

  &.active {
    color: ${({ isImage }) => (isImage ? '#0071e0' : '#fff')};
  }
`;

export const AccordionIcon = styled.div`
  margin-left: auto;
  transition: transform 0.6s ease;
  transform: rotate(270deg);
  outline: none;
  border: none;

  &.rotate {
    transform: rotate(90deg);
    outline: none;
    border: none;
  }
`;

export const AccordionContent = styled.div<{ isImage?: boolean }>`
  background-color: transparent;
  overflow-y: ${({ isImage }) => (isImage ? 'hidden' : 'scroll')};
  overflow-x: hidden;
  transition: max-height 0.6s ease;
  color: white;
  width: 283px;
  height: 100%;
  max-width: 354px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-self: center;
  align-self: center;
  outline: none;
  border: none;
  img {
    border-radius: 12px;
    object-fit: contain;
    max-width: 100%;
    outline: none;
    border: none;
  }

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: #252538;
    border-radius: 36px;
  }
  ::-webkit-scrollbar-thumb {
    background: #0071e0;
    border-radius: 36px;
  }
`;
