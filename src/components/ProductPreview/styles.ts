import styled from "styled-components";

export const ProductInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  max-width: 494px;
  max-height: 80%;
  margin-top: 2px;
`;

export const ImgContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  max-height: 380px;

  img {
    object-fit: cover;
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
`;

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0 20px 20px;
`;

export const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0;
  padding: 0;
  text-transform: capitalize;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 34px;
  color: #0d0d14;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  color: black;
  margin: 0;
  padding: 0;
`;
