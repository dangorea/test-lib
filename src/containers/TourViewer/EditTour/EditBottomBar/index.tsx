import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import { Add, ChevronLeft, ChevronRight } from "wix-ui-icons-common";
import type { Image360 } from "../../../../store/types";
import { TOUR_MODES } from "../../../../store/viewer/constants";
import { setViewerImageId } from "../../../../store/viewer/actions";
import {
  getKrpanoInterface,
  getViewerImageId,
  getViewerTourMode,
} from "../../../../store/viewer/selectors";
import {
  getCurrentTour,
  getCurrentTourId,
  getHotspots,
} from "../../../../store/tours/selectors";
import { Krpano, VIEWER_CONFIG } from "../../../../utils/config";
import {
  isFullAccess,
  redirectOpenBillingPage,
} from "../../../../utils/premium";
import useOpen from "../../../../utils/hooks/useOpen";
import { AddImage, ArrowBtn, EditBottomBarWrapper } from "./styles";
import AddImagesSidebar from "./AddImagesSidebar";
import ImageListItem from "./ImageListItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderContainer } from "../../PreviewOverlay/PreviewBottomBar/styles";
import SwiperCore, { Keyboard, Navigation } from "swiper";
import { manageSpheres } from "../../../../store/tours/actions";
import { TOUR_ACTIONS } from "../../../../store/tours/constants";
import UnlinkModal from "../../../../components/UnlinkModal";
import { getImageTitles } from "../../../../store/images/selector";
import { createPortal } from "react-dom";
import { getUserConfig } from "../../../../store/config/selectors";
import type { Tour } from "../../../../utils/types";

SwiperCore.use([Navigation, Keyboard]);

const EditBottomBar: FC = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [unlinkId, setUnlinkId] = useState<string | null>(null);
  const [animation, setAnimation] = useState(true);
  const [localSpheres, setLocalSpheres] = useState<Array<Image360>>([]);
  const [selectedCurrentTour, setSelectedCurrentTour] = useState<any>(null);
  const { open, handleOpen, handleClose } = useOpen();
  const tour = useSelector(getCurrentTour()) as Tour;
  const tourMode = useSelector(getViewerTourMode());
  const imageId = useSelector(getViewerImageId()) as string;
  const userConfig = useSelector(getUserConfig());
  const tourId = useSelector(getCurrentTourId()) as string;
  const imageTitle = useSelector(getImageTitles([unlinkId as string]));
  const currentViewerImage = useSelector(getViewerImageId());
  const hotspots = useSelector(getHotspots(currentViewerImage as string));
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const dispatch = useDispatch();

  const duration = {
    appear: 100,
    enter: 100,
    exit: 100,
  };

  useEffect(() => {
    setLocalSpheres(
      tour.spheres.map((tour: Image360, index: number) => {
        return { ...tour, index };
      })
    );
  }, [tour]);

  const openAddImageSidebar = useCallback(() => {
    if (
      !isFullAccess(userConfig.id) &&
      tour.spheres.length >= userConfig.sphereLimitPerTour
    ) {
      redirectOpenBillingPage();
      return;
    }

    handleOpen();
  }, [handleOpen, tour.spheres.length]);

  const changeImage = useCallback(
    (id: string) => {
      dispatch(setViewerImageId(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (tourMode === TOUR_MODES.PREVIEW) {
      setAnimation(false);
    }
  }, [animation, tourMode]);

  function dropHandler(e: { preventDefault: () => void }, card: Image360) {
    e.preventDefault();
    const modifiedTour = localSpheres.map((item: Image360) => {
      if (item.id === card.id) {
        return { ...item, index: selectedCurrentTour.index };
      }
      if (item.id === selectedCurrentTour.id) {
        return { ...item, index: card.index };
      }
      return item;
    });

    setLocalSpheres(modifiedTour);
    const lastVersionTours = modifiedTour
      .sort((a: Image360, b: Image360) => a.index! - b.index!)
      .map(({ index, ...rest }) => {
        return rest;
      }) as Image360[];
    dispatch(
      // @ts-ignore
      manageSpheres(
        tour.id,
        lastVersionTours.map((e) => e.id),
        TOUR_ACTIONS.REORDER
      )
    );
  }

  const unlinkImage = useCallback(() => {
    hotspots?.forEach((hotspot) => {
      if (hotspot.target === unlinkId) {
        krpano.call(`removehotspot(${hotspot.id})`);
      }
    });

    dispatch(
      // @ts-ignore
      manageSpheres(
        tourId,
        [unlinkId as string],
        TOUR_ACTIONS.DELETE,
        (updatedTour) => {
          if (unlinkId === currentViewerImage) {
            dispatch(setViewerImageId(updatedTour.spheres[0].id));
          }
          setUnlinkId(null);
          handleClose();
        }
      )
    );
  }, [currentViewerImage, dispatch, handleClose, unlinkId, tourId]);

  return (
    <>
      <Transition appear in={animation} timeout={duration} nodeRef={nodeRef}>
        {(state) => (
          <EditBottomBarWrapper
            onDrop={(e) => e.stopPropagation()}
            state={state}
            ref={nodeRef}
          >
            <AddImage onClick={openAddImageSidebar}>
              <Add height={45} width={45} color="white" />
            </AddImage>
            <ArrowBtn className={"prev"}>
              <ChevronLeft width={45} height={45} />
            </ArrowBtn>
            <SliderContainer
              show={true}
              style={{
                overflowX: "hidden",
              }}
            >
              <Swiper
                allowTouchMove={false}
                navigation={{
                  nextEl: ".next",
                  prevEl: ".prev",
                }}
                slidesPerView={"auto"}
                spaceBetween={5}
                centerInsufficientSlides={true}
                keyboard={{
                  enabled: true,
                }}
              >
                {localSpheres
                  .sort((a: Image360, b: Image360) => a.index! - b.index!)
                  .map((image: Image360) => (
                    <SwiperSlide
                      key={image.id}
                      onDragStart={() => setSelectedCurrentTour(image)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => dropHandler(e, image)}
                    >
                      <ImageListItem
                        active={image.id === imageId}
                        image={image}
                        setUnlinkId={setUnlinkId}
                        changeImage={changeImage}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </SliderContainer>
            <ArrowBtn className={"next"}>
              <ChevronRight width={45} height={45} />
            </ArrowBtn>
          </EditBottomBarWrapper>
        )}
      </Transition>
      {createPortal(
        <UnlinkModal
          open={!!unlinkId}
          headerLabel="Unlink Images"
          errorMessage="Are you sure you want to unlink following image:"
          handleClose={() => setUnlinkId(null)}
          fileName={imageTitle[0] as string}
          handleUnlink={unlinkImage}
        />,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
      <AddImagesSidebar open={open} handleClose={handleClose} isFromEditBar />
    </>
  );
};

export default EditBottomBar;
