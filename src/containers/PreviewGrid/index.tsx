import React, { FC, ReactElement } from "react";
import { Grid } from "./styles";

type Props = {
  children: ReactElement;
};

const PreviewGrid: FC<Props> = ({ children }) => {
  return <Grid>{children}</Grid>;
};

export default PreviewGrid;
