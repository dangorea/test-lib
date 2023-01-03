import React, { FC, useCallback, useState } from "react";
import { ImageViewerBottomBarWrapper, ImageViewerControls } from "./styles";
import { useSelector } from "react-redux";
import fullscreen from "../../../../assets/icons/fullScreen";
// import minimize from "../../../../assets/icons/minimize.png";
import type { Krpano } from "../../../../utils/config";
import { getKrpanoInterface } from "../../../../store/viewer/selectors";

const ImageViewerBottomBar: FC = () => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const [isFullscreen, setIsFullscreen] = useState(false);

  const switchFullscreen = useCallback(() => {
    krpano.call("switch(fullscreen)");
    setIsFullscreen((isFullscreen) => !isFullscreen);
  }, [krpano]);

  return (
    <ImageViewerBottomBarWrapper>
      <ImageViewerControls>
        <div>
          <img
            // @ts-ignore
            src={isFullscreen ? "" : fullscreen}
            alt={isFullscreen ? "minimize" : "fullscreen"}
            onClick={switchFullscreen}
          />
        </div>
      </ImageViewerControls>
    </ImageViewerBottomBarWrapper>
  );
};

export default ImageViewerBottomBar;
