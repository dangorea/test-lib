import React, { ReactElement } from "react";
import { ChildrenWrapper, TooltipText, TooltipWrapper } from "./styles";
import type { StyledProps } from "styled-components";

type Position = "right" | "bottom" | "top" | "left";

type Props = {
  title: string | undefined;
  children?: ReactElement | string;
  position?: Position;
  theme?: string;
  styles?: StyledProps<any>;
};

const Tooltip = ({
  title,
  children,
  position = "bottom",
  theme = "#162D3D",
  styles,
}: Props) => {
  return (
    <TooltipWrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <TooltipText
        className={`tooltiptext tooltip-${position}`}
        theme={theme ? theme : "#162d3d"}
        style={...styles}
      >
        <span>{title}</span>
      </TooltipText>
    </TooltipWrapper>
  );
};

export default Tooltip;
