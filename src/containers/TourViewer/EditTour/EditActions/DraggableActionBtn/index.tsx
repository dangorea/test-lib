import React, { FC, ReactElement } from "react";
import { DraggableActionBtnWrapper } from "./styles";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { getKrpanoInterface } from "../../../../../store/viewer/selectors";
import type { Krpano, KrpanoPos } from "../../../../../utils/config";
import type { ViewerDropResult } from "../../../../../utils/types";
import move from "../../../../../assets/icons/move.svg";
import Tooltip from "../../../../../components/Tooltip";

type Props = {
  onDrop: (pos: KrpanoPos) => void;
  icon: ReactElement;
  tooltip: string;
};

export const ADD_SPOT_DND_TYPE = "ADD_SPOT_DND_TYPE";

const DraggableActionBtn: FC<Props> = ({ icon, tooltip, onDrop }) => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ADD_SPOT_DND_TYPE,
    end: (_, monitor) => {
      if (monitor.didDrop()) {
        const res = monitor.getDropResult<ViewerDropResult>();

        if (res) {
          const { x, y } = res;

          const krpanoPos = krpano.screentosphere(x, y);
          onDrop(krpanoPos);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Tooltip
      title={tooltip}
      position="right"
      theme="#162D3D"
      styles={{ top: "0px", left: "111%" }}
    >
      <DraggableActionBtnWrapper ref={drag} isDragging={isDragging}>
        <img src={move} alt="move" width="15px" height="15px" />
        {icon}
      </DraggableActionBtnWrapper>
    </Tooltip>
  );
};

export default DraggableActionBtn;
