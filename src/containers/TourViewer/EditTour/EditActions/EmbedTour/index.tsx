import React, { FC } from "react";
import { SvgIconHover } from "../AddFloorPlan/styles";
import { ActionBtn } from "../UpdateCover/styles";
import Tooltip from "../../../../../components/Tooltip";
import PuzzleIcon from "images/puzzleIcon";
import { createPortal } from "react-dom";
import { VIEWER_CONFIG } from "../../../../../utils/config";
import ActionsSidebar from "../ActionsSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTour } from "../../../../../store/tours/selectors";
import { CodeSection } from "./styles";
import { Label } from "../../../../../components/Inputs/FormField/styles";
import CopyIcon from "images/copyIcon";
import { successNotification } from "../../../../../store/notifications/actions";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const EmbedTour: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const tourId = useSelector(getCurrentTour())?.id;
  const dispatch = useDispatch();

  const handleCopy = (copyContent: string) => {
    navigator.clipboard.writeText(copyContent);
    dispatch(successNotification("Copied!"));
  };

  return (
    <>
      <SvgIconHover>
        <ActionBtn onClick={handleOpen}>
          <Tooltip
            title="Embed in Your Website or App"
            position="right"
            styles={{
              left: "35px",
              top: "-10px",
            }}
          >
            <PuzzleIcon />
          </Tooltip>
        </ActionBtn>
      </SvgIconHover>
      {createPortal(
        <ActionsSidebar
          open={open}
          handleClose={handleClose}
          title="Share & embed"
        >
          <Label>
            <span>Direct link:</span>
          </Label>
          <CodeSection>
            {`https://viar.live/tour/${tourId}`}
            <div
              onClick={() => {
                handleCopy(`https://viar.live/tour/${tourId}`);
              }}
            >
              <CopyIcon />
            </div>
          </CodeSection>
          <Label>
            <span>Embed code:</span>
          </Label>
          <CodeSection>
            {`<iframe width="800" height="500" src="https://viar.live/embed/tour/${tourId}" allowFullScreen style="border: none"></iframe>`}
            <div
              onClick={() => {
                handleCopy(
                  `<iframe width="800" height="500" src="https://viar.live/embed/tour/${tourId}" allowFullScreen style="border: none"></iframe>`
                );
              }}
            >
              <CopyIcon />
            </div>
          </CodeSection>
        </ActionsSidebar>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </>
  );
};

export default EmbedTour;
