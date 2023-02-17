import React from "react";
import { Spinner, SpinnerContainer, SpinnerWrapper } from "./styles";

const Loader = () => {
  return (
    <SpinnerWrapper>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    </SpinnerWrapper>
  );
};

export default Loader;
