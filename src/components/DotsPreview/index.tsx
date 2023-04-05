import React, { FC, useEffect, useRef, useState } from "react";
// import DeleteSmall from "wix-ui-icons-common/DeleteSmall";
import type { Link } from "../../store/types";
import Draggable from "react-draggable";
import FloorPlanDot from "../../assets/icons/floorPlanDot";
import { setViewerImageId } from "../../store/viewer/actions";
import { useDispatch } from "react-redux";

type Props = {
  hotspot: Link;
  toggle?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  onDrop: (
    hotspot: Link,
    finalData: { x: number; y: number }
    // nodeRef: RefObject<HTMLDivElement>
  ) => void;
  widthDiff?: number;
  heightDiff?: number;
  parentWidth?: number;
  parentHeight?: number;
};

const Dots: FC<Props> = ({
  hotspot,
  // toggle,
  disabled,
  onDrop,
  widthDiff,
  heightDiff,
  parentWidth,
  parentHeight,
  // onClick,
}) => {
  const dispatch = useDispatch();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [initialData, setInitialData] = useState<{ x: number; y: number }>({
    x: Number(hotspot.ath),
    y: Number(hotspot.atv),
  });

  // useEffect(() => {
  //   if (hotspot.firstDrop && nodeRef.current) {
  //     console.dir(nodeRef.current);
  //     nodeRef.current.click();
  //   }
  // }, [hotspot]);

  useEffect(() => {
    !hotspot.toUpload && onDrop?.(hotspot, initialData /*, nodeRef*/);
  }, [initialData]);

  const newHeight =
    !!heightDiff && parentHeight
      ? Number(hotspot.ath) * Number((heightDiff / parentHeight).toFixed(1)) - 5
      : hotspot.ath;

  const newWidth =
    !!widthDiff && parentWidth
      ? Number(hotspot.atv) * Number((widthDiff / parentWidth).toFixed(1)) - 10
      : hotspot?.atv;

  if (disabled) {
    return (
      <div
        style={{
          position: "absolute",
          top: `${newHeight}px`,
          left: `${newWidth}px`,
        }}
        onClick={() =>
          hotspot.target && dispatch(setViewerImageId(hotspot.target))
        }
      >
        <FloorPlanDot />
      </div>
    );
  }

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
      // onStart={
      //   (_, data) => console.log("onStart", data)
      //   // setInitialData({
      //   //   x: data.x,
      //   //   y: data.y,
      //   // })
      // }
      // onDrag={(_, data) => console.log("onDrag", data)}
      onStop={(_, data) => {
        onDrop(hotspot, data /*, nodeRef*/);
        setInitialData({ x: data.x, y: data.y });
      }}
      position={{
        x: !hotspot.firstDrop ? initialData.x : 0,
        y: !hotspot.firstDrop ? initialData.y : 0,
      }}
    >
      {/*<DotWrapper x={Number(hotspot.ath)} y={Number(hotspot.atv)}>*/}
      <div
        ref={nodeRef}
        style={{
          position: "absolute",
          top: `${hotspot.firstDrop && initialData.x}px`,
          left: `${hotspot.firstDrop && initialData.y}px`,
          // transform: `translate(${Number(hotspot.ath)}px, ${Number(
          //   hotspot.atv
          // )}px) !important`,
        }}
      >
        <FloorPlanDot />
        {/*<Box>*/}
        {/*  <Popover animate placement="top" shown={toggle}>*/}
        {/*    <Popover.Element>*/}
        {/*      <PopoverMenu*/}
        {/*        textSize="small"*/}
        {/*        triggerElement={*/}
        {/*          <div*/}
        {/*            style={{*/}
        {/*              position: "absolute",*/}
        {/*              top: "-25px",*/}
        {/*              left: "-10px",*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            {FloorPlanDot()}*/}
        {/*          </div>*/}
        {/*        }*/}
        {/*      >*/}
        {/*        <PopoverMenu.MenuItem*/}
        {/*          text="Delete"*/}
        {/*          skin="destructive"*/}
        {/*          prefixIcon={<DeleteSmall />}*/}
        {/*          onClick={onClick}*/}
        {/*        />*/}
        {/*      </PopoverMenu>*/}
        {/*    </Popover.Element>*/}
        {/*    <Popover.Content>*/}
        {/*      <div*/}
        {/*        style={{*/}
        {/*          position: "absolute",*/}
        {/*          top: "-40px",*/}
        {/*          left: "-25px",*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <Box*/}
        {/*          background="#0D0D14"*/}
        {/*          border="1 px solid #252538"*/}
        {/*          padding="5px 19px"*/}
        {/*          borderRadius="8.45072px"*/}
        {/*          boxShadow="-73.8244px 67.4534px 80px rgba(0, 0, 0, 0.07), -47.8491px 43.7198px 46.8519px rgba(0, 0, 0, 0.0531481), -28.4361px 25.9821px 25.4815px rgba(0, 0, 0, 0.0425185), -14.7649px 13.4907px 13px rgba(0, 0, 0, 0.035), -6.01532px 5.4962px 6.51852px rgba(0, 0, 0, 0.0274815), -1.36712px 1.24914px 3.14815px rgba(0, 0, 0, 0.0168519)"*/}
        {/*          color="white"*/}
        {/*        >*/}
        {/*          {hotspot?.title}*/}
        {/*        </Box>*/}
        {/*      </div>*/}
        {/*    </Popover.Content>*/}
        {/*  </Popover>*/}
        {/*</Box>*/}
      </div>
      {/*</DotWrapper>*/}
    </Draggable>
  );
};

export default Dots;
