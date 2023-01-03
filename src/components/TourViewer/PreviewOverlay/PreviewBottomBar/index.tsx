import React, { FC, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { getCurrentTour } from "../../../../store/tours/selectors";
import { getImage } from "../../../../store/images/selector";
import { setViewerImageId } from "../../../../store/viewer/actions";
import type { Image360 } from "../../../../store/types";
import {
  getWidgetImageTitleSettings,
  getWidgetTourTitleSettings,
} from "../../../../store/widget/selectors";
import {
  getKrpanoInterface,
  getTypeOfView,
  getViewerImageId,
} from "../../../../store/viewer/selectors";

import type { Krpano } from "../../../../utils/config";

import { getPreviewSrc } from "../../../../utils/image";

import {
  ImagePreview,
  ImageTitle,
  TourTitleContainer,
  PreviewBottomBarWrapper,
  TourControls,
  TourName,
  SliderContainer,
  ImageTitleContainer,
} from "./styles";

import "swiper/swiper.scss";

// import vrGlasses from '../../../../assets/icons/vr-glasses.png';
import fullscreen from "../../../../assets/icons/fullScreen";
// import minimize from "../../../../assets/icons/minimize.png";
// import thumbs from "../../../../assets/icons/thumbs.png";

const PreviewBottomBar: FC = () => {
  const dispatch = useDispatch();

  const tour = useSelector(getCurrentTour());
  const isWidget = useSelector(getTypeOfView());
  const imageId = useSelector(getViewerImageId()) as string;
  const image = useSelector(getImage(imageId)) as Image360;
  const krpano = useSelector(getKrpanoInterface()) as Krpano;

  const widgetTourName = useSelector(getWidgetTourTitleSettings());
  const widgetImageName = useSelector(getWidgetImageTitleSettings());

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbs, setShowThumbs] = useState(false);
  const [isWebVr, setIsWebVr] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      krpano.set("plugin[webvr].onentervr", "fireEvent(e, on:enter_vr_mode);");

      krpano.set("plugin[webvr].onexitvr", "fireEvent(e, on:exit_vr_mode);");
    }, 750);

    return () => {
      krpano.set("plugin[webvr].onentervr", null);

      krpano.set("plugin[webvr].onexitvr", null);
    };
  }, [krpano]);

  useEffect(() => {
    const setVrState = () => {
      setIsWebVr((prevState) => {
        return !prevState;
      });
    };

    document.addEventListener("on:enter_vr_mode", setVrState);
    document.addEventListener("on:exit_vr_mode", setVrState);

    return () => {
      document.removeEventListener("on:enter_vr_mode", setVrState);
      document.removeEventListener("on:exit_vr_mode", setVrState);
    };
  }, [isWebVr]);

  const switchFullscreen = useCallback(() => {
    krpano.call("switch(fullscreen)");
    setIsFullscreen((isFullscreen) => !isFullscreen);
  }, [krpano]);

  const changeImage = useCallback(
    (id: string) => {
      dispatch(setViewerImageId(id));
    },
    [dispatch]
  );

  return isWebVr ? null : (
    <PreviewBottomBarWrapper>
      <ImageTitleContainer>
        {isWidget && widgetImageName.spt && (
          <ImageTitle {...widgetImageName}>
            {image?.title || image?.name}
          </ImageTitle>
        )}

        {!isWidget && <ImageTitle>{image?.title || image?.name}</ImageTitle>}
      </ImageTitleContainer>
      <SliderContainer show={showThumbs}>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          centerInsufficientSlides={true}
        >
          {tour?.spheres.map((sphere?) => (
            <SwiperSlide key={sphere?.id}>
              <ImagePreview
                key={sphere?.id}
                selected={sphere?.id === imageId}
                src={getPreviewSrc(sphere)}
                alt={sphere?.title}
                onClick={() => changeImage(sphere?.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderContainer>

      <TourTitleContainer>
        {isWidget && widgetTourName.showTitle && (
          <TourName
            {...widgetTourName}
            onClick={() => setShowThumbs((showThumbs) => !showThumbs)}
          >
            {tour?.title}
          </TourName>
        )}
        {!isWidget && (
          <TourName onClick={() => setShowThumbs((showThumbs) => !showThumbs)}>
            {tour?.title}
          </TourName>
        )}
      </TourTitleContainer>
      <TourControls>
        {/* <div>
          <img
            src={vrGlasses}
            alt="thumbs"
            onClick={() => {
              krpano.call('webvr.enterVR()');
            }}
          />
        </div> */}
        <div>
          <img
            // @ts-ignore
            src={isFullscreen ? "minimize" : fullscreen}
            alt={isFullscreen ? "minimize" : "fullscreen"}
            onClick={switchFullscreen}
          />
        </div>
        <div>
          <img
            src={"thumbs"}
            alt="thumbs"
            onClick={() => setShowThumbs((showThumbs) => !showThumbs)}
          />
        </div>
      </TourControls>
    </PreviewBottomBarWrapper>
  );
};

export default PreviewBottomBar;
