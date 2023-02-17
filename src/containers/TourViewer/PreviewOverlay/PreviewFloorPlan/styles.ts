import styled from 'styled-components';

export const PreviewFPWrapper = styled.div<{ isWidget: boolean }>`
  box-sizing: border-box;
  position: absolute;
  top: ${({ isWidget }) => (isWidget ? '10px' : '65px')};
  right: 10px;
  display: flex;
  flex-direction: column;
  z-index: 600;
  width: 321px;
  max-width: 321px;
  max-height: 550px;

  & > * {
    margin: 10px;
  }

  background: rgba(21, 21, 31, 0.9);
  border: 1px solid #252538;
  box-shadow: -73.8244px 67.4534px 80px rgba(0, 0, 0, 0.07),
    -47.8491px 43.7198px 46.8519px rgba(0, 0, 0, 0.0531481),
    -28.4361px 25.9821px 25.4815px rgba(0, 0, 0, 0.0425185),
    -14.7649px 13.4907px 13px rgba(0, 0, 0, 0.035),
    -6.01532px 5.4962px 6.51852px rgba(0, 0, 0, 0.0274815),
    -1.36712px 1.24914px 3.14815px rgba(0, 0, 0, 0.0168519);
  border-radius: 12px;
`;

export const AccordionContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-left: 3px;
  outline: none;
`;
