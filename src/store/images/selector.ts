import type { Image360, PaginationMetadata, RootState } from "../types";

export const getIsImagesLoading =
  () =>
  (state: any): boolean =>
    state.images.isLoading;

export const getMyImages =
  () =>
  (state: RootState): Image360[] => {
    const { page, items } = state.images.data;

    return page?.map((id) => items[id]) || [];
  };

export const getImage =
  (imgId: string) =>
  (state: RootState): Image360 | null =>
    state.images.data.items?.[imgId];

export const getImages =
  (imgIds: string[]) =>
  (state: RootState): (Image360 | null)[] =>
    imgIds.map((id) => getImage(id)(state));

export const getImageTitles =
  (ids: string[]) =>
  (state: RootState): (string | null)[] => {
    return getImages(ids)(state).map((img) => img && (img.title || img.name));
  };

export const getUploadProgress =
  (id: string) =>
  (state: RootState): number | undefined => {
    const progress = state.images.uploadProgress?.[id];
    return progress && progress * 100;
  };

export const getImagesMetadata =
  () =>
  ({ images }: RootState): PaginationMetadata => {
    return images.data.metadata;
  };
