import React, { FC } from "react";
import { useSelector } from "react-redux";

import { requestMyImages } from "../../../../../../store/images/actions";
import { getCurrentTour } from "../../../../../../store/tours/selectors";
import {
  getImagesMetadata,
  getMyImages,
} from "../../../../../../store/images/selector";

import {
  AddImagesGridPagination,
  AddImagesGridWrapper,
  AddImgGrid,
} from "./styles";
import AddImagesGridItem from "./AddImagesGridItem";
import { useWindowSize } from "../../../../../../utils/hooks/useWindowSize";
import type { Image360 } from "../../../../../../store/types";

type Handler = (prev: string[]) => string[];

type Props = {
  selected: string[];
  setSelected: (handler: Handler) => void;
};

const AddImagesGrid: FC<Props> = ({ selected, setSelected }) => {
  const imagesMeta = useSelector(getImagesMetadata());
  const images = useSelector(getMyImages());
  const currentTour = useSelector(getCurrentTour());
  const currentTourImageIds = currentTour?.spheres.map((image) => image.id);
  const filteredImages = images.filter(
    (image: Image360) => !currentTourImageIds?.includes(image.id)
  );
  const size = useWindowSize();
  const imagesPerPage = (size?.height as number) < 700 ? 6 : 9;

  if (!images && !imagesMeta && !imagesPerPage) {
    return null;
  }

  return (
    <AddImagesGridWrapper>
      <AddImgGrid>
        {filteredImages.map((image: Image360) => (
          <AddImagesGridItem
            key={image.id}
            image={image}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </AddImgGrid>
      {imagesMeta && imagesPerPage && (
        <AddImagesGridPagination
          requestHandler={requestMyImages}
          perPage={imagesPerPage}
          metadata={imagesMeta}
        />
      )}
    </AddImagesGridWrapper>
  );
};

export default AddImagesGrid;
