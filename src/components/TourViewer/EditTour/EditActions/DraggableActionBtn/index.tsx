import React, { FC, ReactElement } from "react";
import { DraggableActionBtnWrapper } from "./styles";
// import move from ;
import { Tooltip } from "wix-style-react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { getKrpanoInterface } from "../../../../../store/viewer/selectors";
import type { Krpano, KrpanoPos } from "../../../../../utils/config";
import { ViewerDropResult } from "../../../../../utils/types";
// import move from "../../../../../assets/icons/move";
// import { ReactComponent as MoveIcon } from "../../../../../assets/icons/move.svg";

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
    <Tooltip placement="right" content={tooltip}>
      <DraggableActionBtnWrapper ref={drag} isDragging={isDragging}>
        {/*<MoveIcon />*/}
        {icon}
      </DraggableActionBtnWrapper>
    </Tooltip>
  );
};

export default DraggableActionBtn;
