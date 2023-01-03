import React, { FC, useEffect, useState } from "react";
import type { Level, Link, SelectedImage } from "../../../../store/types";
import {
  FloorPlansContainer,
  ImageListContainer,
  SliderContainer,
  IconDeleteElement,
  UnlinkBtn,
} from "../styles";
import { ChevronLeft, ChevronRight, Dismiss } from "wix-ui-icons-common";
import { Swiper, SwiperSlide } from "swiper/react";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { getTourId } from "../../../../store/viewer/selectors";
import { deleteFloorPlanLevel } from "../../../../store/tours/actions";
import { v4 as uuid } from "uuid";

type Props = {
  image: FileList | Level[] | null;
  setImage: React.Dispatch<
    React.SetStateAction<FileList | Array<Level> | null>
  >;
  selectedImage: SelectedImage;
  setSelectedImage: React.Dispatch<React.SetStateAction<SelectedImage>>;
  savedPosition: Array<Link>;
  setSavedPosition: React.Dispatch<React.SetStateAction<any>>;
};

const duration = {
  appear: 100,
  enter: 100,
  exit: 100,
};

const ImageCarousel: FC<Props> = ({
  image,
  setImage,
  selectedImage,
  setSelectedImage,
  savedPosition,
  setSavedPosition,
}) => {
  const [imageAction, setImageAction] = useState<boolean>(false);
  const [animation, _] = useState(true);
  const tourId = useSelector(getTourId()) as string;
  const dispatch = useDispatch();

  useEffect(() => {
    savedPosition.forEach((savedDot) => {
      !savedDot.hasOwnProperty("style") && imageAction && setSavedPosition([]);
      setImageAction(false);
    });
  }, [imageAction]);

  const imageSwitch = (selectedImage: SelectedImage) => {
    if (selectedImage?.hasOwnProperty("url")) {
      // @ts-ignore
      return selectedImage?.url;
    }
    return URL.createObjectURL(selectedImage as File);
  };

  return (
    <Transition
      key={uuid().slice(0, 8)}
      appear
      in={animation}
      timeout={duration}
    >
      <FloorPlansContainer key={uuid().slice(0, 8)}>
        <ChevronLeft className={"prev"} width={45} height={45} />
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
            {/*// @ts-ignore*/}
            {Array.from(image)?.map((item, index) => {
              return (
                <SwiperSlide
                  // @ts-ignore
                  key={item.id || uuid().slice(0, 8)}
                  style={{
                    alignSelf: "center",
                  }}
                >
                  <ImageListContainer>
                    <IconDeleteElement
                      onClick={() => {
                        setImage(
                          // @ts-ignore
                          Array.from(image)?.filter((_item, itemIndex) => {
                            return itemIndex !== index;
                          })
                        );
                        // @ts-ignore
                        if (item.id) {
                          // @ts-ignore
                          dispatch(deleteFloorPlanLevel(tourId, item.id));
                        }
                      }}
                    >
                      <UnlinkBtn>
                        <Dismiss />
                      </UnlinkBtn>
                    </IconDeleteElement>
                    <img
                      // @ts-ignore
                      className={item?.id === selectedImage?.id ? "active" : ""}
                      src={imageSwitch(item)}
                      alt=""
                      onClick={() => {
                        setImageAction(true);
                        return setSelectedImage(item);
                      }}
                      draggable={false}
                    />
                  </ImageListContainer>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SliderContainer>
        <ChevronRight className={"next"} width={45} height={45} />
      </FloorPlansContainer>
    </Transition>
  );
};

export default ImageCarousel;
