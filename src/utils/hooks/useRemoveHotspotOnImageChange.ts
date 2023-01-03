import { useEffect } from 'react';

export const useRemoveHotspotOnImageChange = (
  imageId: string,
  handleClose: () => void
): void => {
  useEffect(() => {
    if (imageId) {
      handleClose();
    }
  }, [imageId, handleClose]);
};
