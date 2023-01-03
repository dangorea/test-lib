import React, { FC, useRef, useState } from "react";
import {
  EmptyMessage,
  ImageInfo,
  ImageWrapper,
  ImagePreviewContainer,
  ZoomImageBtn,
} from "./styles";
// import floorPlanImg from "../../../../../../assets/images/floorPlanImage.svg";
import { useDragDropManager } from "react-dnd";
import { v4 as uuid } from "uuid";
import FloorPlanIcon from "../../FloorPlanIcon/index";
import Dots from "../components/dots";
import type {
  Image360,
  Link,
  SelectedImage,
} from "../../../../../../store/types";
import {
  deleteFloorLevelLink,
  updateFloorLevelLink,
} from "../../../../../../store/tours/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getTourId,
  getTypeOfView,
} from "../../../../../../store/viewer/selectors";
import { getAllSpheres } from "../../../../../../store/tours/selectors";
import ImagePreviewLayout from "./ImagePreviewLayout";
// import loopIcon from "../../../../../../assets/icons/loopIcon.svg";

type Props = {
  savedPosition: Array<Link>;
  selectedImage?: any;
  toggle: boolean;
  setSavedPosition?: React.Dispatch<React.SetStateAction<Array<Link>>>;
  disabled?: boolean;
};

const ImageContainer: FC<Props> = ({
  selectedImage,
  toggle,
  savedPosition,
  setSavedPosition,
  disabled,
}) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const dragDropManager = useDragDropManager();
  const dispatch = useDispatch();
  const tourId = useSelector(getTourId()) as string;
  const spheres = useSelector(getAllSpheres());
  const isWidget = useSelector(getTypeOfView());
  const [imageSizes, setImageSizes] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const ref = useRef(null);

  const onDrop = (e: { nativeEvent: { offsetX: number; offsetY: number } }) => {
    const monitor = dragDropManager.getMonitor();
    if (monitor.getItem().target) {
      const selectedSphere: Image360[] | undefined = spheres?.filter(
        (sphere) => sphere.id === monitor.getItem().target
      );
      setSavedPosition?.([
        ...savedPosition,
        {
          id: uuid().slice(0, 8),
          atv: String(e.nativeEvent.offsetX),
          ath: String(e.nativeEvent.offsetY),
          target: monitor.getItem().target,
          title: selectedSphere?.[0].name.split(".").slice(0, -1).join("."),
          toUpload: true,
        },
      ]);
    }
  };

  const imageSwitch = (selectedImage: SelectedImage) => {
    if (!selectedImage) {
      return "floorPlanImg";
    }

    if (selectedImage.hasOwnProperty("url")) {
      // @ts-ignore
      return selectedImage.url;
    }

    return URL.createObjectURL(selectedImage as File);
  };

  const onChange = (
    hotspot: Link,
    finalData: { x: number; y: number }
  ): void => {
    if (finalData.x !== 0 || finalData.y !== 0) {
      dispatch(
        updateFloorLevelLink(tourId, selectedImage.id, hotspot.id, {
          atv: Number(hotspot.atv) + finalData.x,
          ath: Number(hotspot.ath) + finalData.y,
        })
      );
    }
  };

  const removeDot = (hotspot: Link) => {
    if (!hotspot.id) {
      return;
    }

    const data = savedPosition.filter((link) => link.id === hotspot.id);
    if (data[0].hasOwnProperty("style")) {
      dispatch(deleteFloorLevelLink(tourId, selectedImage.id, hotspot.id));
    }
    setSavedPosition?.(
      savedPosition.filter((link: Link) => {
        return link.id !== hotspot.id;
      })
    );
  };

  return (
    // <ImageWrapper>
    //   <img
    //     onDrop={selectedImage && onDrop.bind(this)}
    //     src={imageSwitch(selectedImage)}
    //     alt=""
    //     draggable={false}
    //     ref={ref}
    //     onLoad={() =>
    //       setImageSizes({
    //         // @ts-ignore
    //         width: ref?.current?.clientWidth,
    //         // @ts-ignore
    //         height: ref?.current?.clientHeight,
    //       })
    //     }
    //   />
    //   {selectedImage && (
    //     <ImagePreviewContainer isWidget={isWidget}>
    //       <ZoomImageBtn onClick={() => setOpenPreview(true)}>
    //         <img src={"loopIcon"} alt="" />
    //       </ZoomImageBtn>
    //       <ImagePreviewLayout
    //         content={imageSwitch(selectedImage)}
    //         title={selectedImage.title || selectedImage.name}
    //         links={selectedImage.links}
    //         open={openPreview}
    //         setOpen={setOpenPreview}
    //         parentImgSizes={imageSizes}
    //       />
    //     </ImagePreviewContainer>
    //   )}
    //   {savedPosition?.map((hotspot: Link) => {
    //     return (
    //       <Dots
    //         key={hotspot.id}
    //         hotspot={hotspot}
    //         toggle={toggle}
    //         disabled={disabled}
    //         onDrop={onChange}
    //         onClick={() => removeDot(hotspot)}
    //       />
    //     );
    //   })}
    //   {!selectedImage && (
    //     <ImageInfo>
    //       <FloorPlanIcon color="white" height={64} width={64} />
    //       <EmptyMessage>
    //         Currently, you don't have any uploaded images.
    //       </EmptyMessage>
    //     </ImageInfo>
    //   )}
    // </ImageWrapper>
    <></>
  );
};

export default ImageContainer;
