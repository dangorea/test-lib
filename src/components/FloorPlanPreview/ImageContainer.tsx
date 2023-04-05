import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import {
  EmptyMessage,
  ImageInfo,
  ImageWrapper,
  ImagePreviewContainer,
  ZoomImageBtn,
} from "./styles";
import floorPlanImg from "../../assets/images/floorPlanImage.svg";
import { useDragDropManager } from "react-dnd";
import { v4 as uuid } from "uuid";
import FloorPlanIcon from "../../containers/TourViewer/EditTour/EditActions/FloorPlanIcon/index";
import Dots from "../DotsPreview/index";
import type { Image360, Level, Link } from "../../store/types";
import {
  deleteFloorLevelLink,
  updateFloorLevelLink,
} from "../../store/tours/actions";
import { useDispatch, useSelector } from "react-redux";
import { getTypeOfView } from "../../store/viewer/selectors";
import {
  getAllSpheres,
  getCurrentTourId,
  getLinkFromLevel,
} from "../../store/tours/selectors";
import loopIcon from "../../assets/icons/loopIcon.svg";
import { useField } from "formik";
import { CONFIG } from "../../utils/config";
import { successNotification } from "../../store/notifications/actions";

type Props = {
  name: string;
  disabled?: boolean;
};

const ImageContainer: FC<Props> = ({ name, disabled }) => {
  const [{ value }, _, helpers] = useField(name);
  const [levelField] = useField("level");
  const imageId = levelField.value?.id;
  // const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [imageSizes, setImageSizes] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const dragDropManager = useDragDropManager();
  const dispatch = useDispatch();
  const tourId = useSelector(getCurrentTourId()) as string;
  const spheres = useSelector(getAllSpheres());
  const links = useSelector(getLinkFromLevel(imageId));
  const isWidget = useSelector(getTypeOfView());
  const [savedPosition, setSavedPosition] = useState<any>([]);
  const ref = useRef<any>(null);

  useEffect(() => {
    helpers.setValue(links);
  }, [levelField.value]);

  // useEffect(() => {
  //   helpers.setValue(value);
  // }, [value]);

  const imageSwitch = (selectedImage: Level) => {
    if (!selectedImage) {
      return floorPlanImg;
    }
    return `${CONFIG.storageUrl}/media/${selectedImage.id}/${selectedImage.name}`;
  };

  const onDrop = (e: { nativeEvent: { offsetX: number; offsetY: number } }) => {
    const monitor = dragDropManager.getMonitor();
    if (monitor.getItem().target) {
      const selectedSphere: Image360[] | undefined = spheres?.filter(
        (sphere) => sphere.id === monitor.getItem().target
      );
      helpers.setValue?.([
        ...value,
        {
          id: uuid().slice(0, 8),
          atv: String(e.nativeEvent.offsetX),
          ath: String(e.nativeEvent.offsetY),
          target: monitor.getItem().target,
          title: selectedSphere?.[0].name.split(".").slice(0, -1).join("."),
          toUpload: true,
          firstDrop: true,
        },
      ]);
    }
  };

  const onChange = (
    hotspot: Link,
    data: { x: number; y: number }
    // nodeRef: RefObject<HTMLDivElement>
  ): void => {
    const { x, y } = data;
    if (hotspot.toUpload) {
      hotspot.ath = String(x);
      hotspot.atv = String(y);
      hotspot.firstDrop = false;
    }

    if ((x !== 0 || y !== 0) && !hotspot.toUpload) {
      dispatch(
        //@ts-ignore
        updateFloorLevelLink(tourId, levelField.value.id, hotspot.id, {
          atv: y,
          ath: x,
        })
      );
      // dispatch(successNotification("Hotspot updated"));
    }
  };

  const removeDot = (hotspot: Link) => {
    if (!hotspot.id) {
      return;
    }

    const data = savedPosition.filter((link: Link) => link.id === hotspot.id);
    if (data[0].hasOwnProperty("style")) {
      dispatch(
        //@ts-ignore
        deleteFloorLevelLink(tourId, value.id, hotspot.id)
      );
    }
    setSavedPosition?.(
      savedPosition.filter((link: Link) => {
        return link.id !== hotspot.id;
      })
    );
  };

  // TODO fix here
  // const nodeRef = useRef<HTMLDivElement>(null);
  // const [initialData, setInitialData] = useState<{ x: number; y: number }>({
  //   x: 0,
  //   y: 0,
  // });

  return (
    <ImageWrapper>
      <img
        onDrop={(e) => onDrop(e)}
        src={imageSwitch(levelField.value)}
        alt=""
        draggable={false}
        ref={ref}
        onLoad={() =>
          setImageSizes({
            width: ref?.current?.clientWidth,
            height: ref?.current?.clientHeight,
          })
        }
      />
      {value?.map((hotspot: Link) => {
        return (
          <Dots
            key={hotspot.id}
            hotspot={hotspot}
            disabled={disabled}
            onDrop={onChange}
            onClick={() => removeDot(hotspot)}
          />
        );
      })}
      {levelField.value ? (
        <ImagePreviewContainer isWidget={isWidget}>
          <ZoomImageBtn /*onClick={() => setOpenPreview(true)}*/>
            <img draggable={false} src={loopIcon} alt="" />
          </ZoomImageBtn>
          {/*<ImagePreviewLayout*/}
          {/*  content={imageSwitch(value)}*/}
          {/*  title={value.title || value.name}*/}
          {/*  links={value.links}*/}
          {/*  open={openPreview}*/}
          {/*  setOpen={setOpenPreview}*/}
          {/*  parentImgSizes={imageSizes}*/}
          {/*/>*/}
        </ImagePreviewContainer>
      ) : null}
      {!levelField.value && (
        <ImageInfo>
          <FloorPlanIcon color="white" height={64} width={64} />
          <EmptyMessage>
            Currently, you don't have any uploaded images.
          </EmptyMessage>
        </ImageInfo>
      )}
    </ImageWrapper>
  );
};

export default ImageContainer;
