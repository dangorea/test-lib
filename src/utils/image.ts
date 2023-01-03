import type { Image360, Tour } from "../store/types";
import { CONFIG } from "./config";

export const getPreviewSrc = ({
  startingPoint,
  updatedAt,
}: Image360 | Tour): string => {
  return (
    startingPoint &&
    `${CONFIG.storageUrl}/${startingPoint.previewUrl}?v=${updatedAt}`
  );
};
export const getCoverSrc = ({
  startingPoint,
  updatedAt,
}: Image360 | Tour): string => {
  return (
    startingPoint &&
    `${CONFIG.storageUrl}/${startingPoint.coverUrl}?v=${updatedAt}`
  );
};

export const getThumbSrc = ({
  startingPoint,
  updatedAt,
}: Image360 | Tour): string => {
  return (
    startingPoint &&
    `${CONFIG.storageUrl}/${startingPoint.thumbUrl}?v=${updatedAt}`
  );
};
