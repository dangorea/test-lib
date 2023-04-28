import type { Image360 } from "../store/types";
import type { Tour } from "./types";
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
