import React, { FC, useEffect, useRef, useState } from "react";
import type { Level } from "../../store/types";
import {
  FloorPlansContainer,
  ImageListContainer,
  SliderContainer,
  IconDeleteElement,
  UnlinkBtn,
} from "./styles";
import { ChevronLeft, ChevronRight, Dismiss } from "wix-ui-icons-common";
import { Swiper, SwiperSlide } from "swiper/react";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { getTourId } from "../../store/viewer/selectors";
import { deleteFloorPlanLevel } from "../../store/tours/actions";
import { getLevels } from "../../store/tours/selectors";
import { CONFIG } from "../../utils/config";

type Props = {
  selectedImage: Level;
  setSelectedImage: (arg: Level | null) => void;
  setLabel: (arg: string) => void;
};

const duration = {
  appear: 100,
  enter: 100,
  exit: 100,
};

const ImageCarousel: FC<Props> = ({
  selectedImage,
  setSelectedImage,
  setLabel,
}) => {
  // const [imageAction, setImageAction] = useState<boolean>(false);
  const [animation, _] = useState(true);
  const tourId = useSelector(getTourId()) as string;
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const levels = useSelector(getLevels());

  useEffect(() => {
    setSelectedImage(levels[0] || levels[levels.length - 1]);

    if (!levels.length) {
      setSelectedImage(null);
      setLabel("");
    }
  }, [levels]);

  if (!levels.length) {
    return null;
  }

  return (
    <Transition appear in={animation} timeout={duration} nodeRef={nodeRef}>
      <FloorPlansContainer ref={nodeRef}>
        <ChevronLeft className="prev" width={45} height={45} color="#fff" />
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
            spaceBetween={19}
            centerInsufficientSlides={true}
            keyboard={{
              enabled: false,
            }}
          >
            {Array.from(levels).map((level) => {
              return (
                <SwiperSlide
                  key={level.id}
                  style={{
                    alignSelf: "center",
                  }}
                >
                  <ImageListContainer
                    className={level.id === selectedImage?.id ? "active" : ""}
                  >
                    <IconDeleteElement
                      onClick={() =>
                        dispatch(
                          // @ts-ignore
                          deleteFloorPlanLevel(tourId, level.id)
                        )
                      }
                    >
                      <UnlinkBtn>
                        <Dismiss />
                      </UnlinkBtn>
                    </IconDeleteElement>
                    <img
                      src={`${CONFIG.storageUrl}/media/${level.id}/${level.name}`}
                      onClick={() => setSelectedImage(level)}
                      draggable={false}
                      alt=""
                    />
                  </ImageListContainer>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SliderContainer>
        <ChevronRight className="next" width={45} height={45} color="#fff" />
      </FloorPlansContainer>
    </Transition>
  );
};

export default ImageCarousel;
