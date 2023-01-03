import React, { Dispatch, FC, SetStateAction, useCallback } from "react";
import PreviewGrid from "../../PreviewGrid/index";
import ImageDeleteModal from "./ImageDeleteModal";
import ImageItem from "./ImageItem";

import type { Image360 } from "../../../store/types";
import { SelectAllCheckbox, SelectCount } from "./ImageGridActions/styles";
import { Text } from "wix-style-react";

type Props = {
  images: Image360[];
  selected: string[];
  deletedIds: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  setDeletedIds: Dispatch<SetStateAction<string[]>>;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  selectedCount: number;
};

const ImageGrid: FC<Props> = ({
  images,
  selected,
  deletedIds,
  setSelected,
  setDeletedIds,
  open,
  handleClose,
  handleOpen,
  selectedCount,
}) => {
  const toggleSelect = useCallback(
    (id: string) =>
      setSelected((selected) => {
        if (selected.includes(id)) {
          return selected.filter((imgId) => id !== imgId);
        } else {
          return [...selected, id];
        }
      }),
    [setSelected]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setDeletedIds([id]);
      handleOpen();
    },
    [handleOpen, setDeletedIds]
  );
  const selectAll = useCallback(
    () => setSelected(images.map(({ id }) => id)),
    [images, setSelected]
  );

  const handleAllCheck = useCallback(() => {
    selectedCount ? setSelected([]) : selectAll();
  }, [selectAll, selectedCount, setSelected]);

  return (
    <>
      <div>
        {!!images.length && (
          // @ts-ignore
          <SelectAllCheckbox
            checked={selectedCount === images.length}
            onChange={handleAllCheck}
            indeterminate={!!selectedCount && selectedCount !== images.length}
          >
            <Text>{selectedCount ? "Unselect all" : "Select all"}</Text>
            <SelectCount skin="disabled">
              {!!selectedCount && `${selectedCount} selected`}
            </SelectCount>
          </SelectAllCheckbox>
        )}
        <PreviewGrid>
          <>
            {images.map((img) => (
              <ImageItem
                img={img}
                key={img.id}
                isSelected={selected.includes(img.id)}
                toggleSelect={toggleSelect}
                handleDelete={handleDelete}
              />
            ))}
          </>
        </PreviewGrid>
      </div>
      <ImageDeleteModal
        handleClose={handleClose}
        ids={deletedIds}
        setDeleteIds={setDeletedIds}
        open={open}
        setSelected={setSelected}
      />
    </>
  );
};

export default ImageGrid;
