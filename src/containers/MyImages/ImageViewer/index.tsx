import React, { FC } from "react";
import Viewer from "../../Viewer";
import ImageViewerActions from "./ImageViewerActions";
import ImageViewerBottomBar from "./ImageViewerBottomBar";

type Props = {
  id: string;
};

const ImageViewer: FC<Props> = ({ id }) => {
  return (
    <Viewer id={id}>
      <>
        <ImageViewerActions />
        <ImageViewerBottomBar />
      </>
    </Viewer>
  );
};

export default ImageViewer;
