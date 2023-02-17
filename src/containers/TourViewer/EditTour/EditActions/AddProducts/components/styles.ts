import styled, { keyframes } from "styled-components";

export const ProductInfoBlock = styled.div`
  border: solid 1px #c1e4fe;
  background: white;
  border-radius: 8px;
  max-width: 494px;
  max-height: 80%;
  padding-right: 40px;
  padding-left: 40px;
  margin: 10px auto 10px auto;
`;

export const ImgContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 24px 0 0 0;
`;

export const ImageSection = styled.div`
  max-height: 40%;
  max-width: 80%;

  img {
    max-width: 100%;
    max-height: 80%;
    border-radius: 8px;
    box-shadow: rgba(17, 17, 26, 0.2) 0 4px 8px,
      rgba(17, 17, 26, 0.08) 0 8px 16px;
  }
`;

export const ColorsContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 10px;
  padding: 30px 0 0 0;

  .colorsCenter {
    max-width: 100%;
    max-height: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 10px;
  }
`;

export const Colors = styled.div<{ color: string }>`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  border: 0.1em solid rgba(15, 28, 63, 0.34);
  border-radius: 50%;
  box-shadow: 0.2em 0.15em 0 0 rgba(15, 28, 63, 0.04);
  height: 1.6em;
  width: 1.6em;
`;

export const HeadContainer = styled.div`
  display: block;
  max-width: 95%;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 21px 0 0 0;

  h1 {
    color: black;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 28px;
    font-weight: bolder;
    letter-spacing: 2.4px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 4px 0 4px 0;

  h2 {
    color: black;
    margin: 0;
    padding: 0;
  }
`;

export const DescriptionBlock = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 4px 0 28px 0;
  max-width: 100%;
  max-height: 50%;

  h2 {
    color: black;
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }
`;

export const SearchSpinnerBlock = styled.div`
  background: white;
  max-width: 100%;
  height: 19.5vh;
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const SearchSpinner = styled.div`
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: auto;
  margin-bottom: auto;
`;
