import React, { FC, useCallback, useState } from "react";
import { SvgIconHover } from "./styles";
// import { IconButton, Tooltip } from "wix-style-react";
import FloorPlanIcon from "../FloorPlanIcon/index";
import { createPortal } from "react-dom";
import { VIEWER_CONFIG } from "../../../../../utils/config";
import type { Level } from "../../../../../store/types";
import ActionsSidebar from "./ActionModal/index";
import FloorPlanInput from "../../../../../components/Inputs/FloorPlanInput";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const AddFloorPlan: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const [uploadedImage, setUploadedImage] = useState<
    FileList | Array<Level> | null
  >(null);

  const onCancel = useCallback(() => {
    setUploadedImage(null);
    handleClose();
  }, [handleClose]);

  return (
    <div>
      {/*TODO Fix here*/}
      {/*<Tooltip*/}
      {/*  moveArrowTo={5}*/}
      {/*  content="Floor Plan"*/}
      {/*  placement="auto"*/}
      {/*  size="small"*/}
      {/*>*/}
      {/*  <IconButton skin="inverted" onClick={handleOpen}>*/}
      {/*<SvgIconHover>*/}
      {/*  <FloorPlanIcon />*/}
      {/*</SvgIconHover>*/}
      {/*</IconButton>*/}
      {/*</Tooltip>*/}
      {createPortal(
        <ActionsSidebar open={open} handleClose={onCancel} title="Floor Plan">
          <></>
          {/*<FloorPlanInput*/}
          {/*  open={open}*/}
          {/*  uploadedImage={uploadedImage}*/}
          {/*  setUploadedImage={setUploadedImage}*/}
          {/*/>*/}
        </ActionsSidebar>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </div>
  );
};

export default AddFloorPlan;
