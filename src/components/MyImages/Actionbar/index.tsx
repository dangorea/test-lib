import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';

import type { Image360 } from '../../../store/types';
import ImageGridActions from '../ImageGrid/ImageGridActions';

type Props = {
  images: Image360[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  setDeletedIds: Dispatch<SetStateAction<string[]>>;
  handleOpen: () => void;
  selectedCount: number;
};

const Actionbar: FC<Props> = ({
  images,
  selected,
  selectedCount,
  setDeletedIds,
  handleOpen,
}) => {
  const handleDeleteSelected = useCallback(() => {
    setDeletedIds(selected);
    handleOpen();
  }, [selected, setDeletedIds, handleOpen]);

  return (
    <>
      <ImageGridActions
        images={images}
        selected={selected}
        setSelected={setDeletedIds}
        handleDeleteSelected={handleDeleteSelected}
        selectedCount={selectedCount}
      />
    </>
  );
};

export default Actionbar;
