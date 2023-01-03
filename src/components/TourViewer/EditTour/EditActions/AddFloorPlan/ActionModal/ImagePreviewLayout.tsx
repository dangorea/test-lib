import { Box, Modal, ModalPreviewLayout } from "wix-style-react";
import React, { FC, useRef, useState } from "react";
import type { Link } from "../../../../../../store/types";
import Dots from "../components/dots";

type Props = {
  content: string;
  title: string;
  links: Link[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentImgSizes: {
    width: number;
    height: number;
  };
};

const ImagePreviewLayout: FC<Props> = ({
  content,
  open,
  setOpen,
  title,
  links,
  parentImgSizes,
}) => {
  const imageRef = useRef(null);
  const [imageSizes, setImageSizes] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  return (
    // @ts-ignore
    <Modal isOpen={open}>
      <ModalPreviewLayout title={title} onClose={() => setOpen(!open)}>
        {/*@ts-ignore*/}
        <Box verticalAlign="middle" height="100%">
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={content}
              alt=""
              ref={imageRef}
              width="100%"
              onLoad={() =>
                setImageSizes({
                  // @ts-ignore
                  width: imageRef?.current?.clientWidth,
                  // @ts-ignore
                  height: imageRef?.current?.clientHeight,
                })
              }
              height="530px"
            />
            {links?.map((link) => {
              return (
                <Dots
                  key={Math.random()}
                  hotspot={link}
                  toggle={false}
                  disabled={true}
                  heightDiff={imageSizes.height}
                  widthDiff={imageSizes.width}
                  parentWidth={parentImgSizes.width}
                  parentHeight={parentImgSizes.height}
                />
              );
            })}
          </div>
        </Box>
      </ModalPreviewLayout>
    </Modal>
  );
};

export default ImagePreviewLayout;
