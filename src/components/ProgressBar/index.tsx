import React from "react";
import { ContainerStyles, FillerStyles } from "./styles";

const ProgressBar = ({ value }: any) => {
  return (
    <ContainerStyles>
      <FillerStyles completed={value}></FillerStyles>
    </ContainerStyles>
  );
};

export default ProgressBar;
