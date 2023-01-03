export const getIsImagesLoading =
  () =>
  (state: any): boolean =>
    state.images.isLoading;

export const getMyImages =
  () =>
  (state: any): any => {
    return state.images.data.items;
  };

export const getImage =
  (imgId: string) =>
  (state: any): any | null =>
    state.images.data.items?.[imgId];

export const getImages =
  (imgIds: string[]) =>
  (state: any): (any | null)[] =>
    imgIds.map((id) => getImage(id)(state));

export const getImageTitles =
  (ids: string[]) =>
  (state: any): (string | null)[] => {
    return getImages(ids)(state).map((img) => img && (img.title || img.name));
  };

export const getUploadProgress =
  (id: string) =>
  (state: any): number | undefined => {
    const progress = state.images.uploadProgress?.[id];
    return progress && progress * 100;
  };

export const getImagesMetadata =
  () =>
  (state: any): any =>
    state.images.data.metadata;
