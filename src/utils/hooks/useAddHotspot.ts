import { useCallback } from "react";
import { useSelector } from "react-redux";

import { getKrpanoInterface } from "../../store/viewer/selectors";
import type { Hotspot } from "../../store/tours/types";
import { HOTSPOT_TYPES } from "../../store/tours/types";

import { CONFIG, Krpano } from "../config";
import { TMP_HOTSPOT_NAME } from "../../containers/TourViewer/EditTour/EditActions/constants";
import type { Icon } from "../../store/types";
import { isJsonString } from "../../store/tours/actions";

export const getHotspotIconUrl = ({
  style,
  color,
  type,
  target,
}: Hotspot): string => {
  if (isJsonString(style)) {
    const icon: Icon = JSON.parse(style);
    return `${CONFIG.storageUrl}/media/${icon.id}/media.png?v=${icon.createdAt}`;
    // return `${CONFIG.storageUrl}/media/${icon.id}/${icon.name}`;
  }

  if (type === HOTSPOT_TYPES.FLAT && target) {
    return `${CONFIG.storageUrl}/spheres/${target}/preview.jpg`;
  }

  return `${CONFIG.apiUrl}icon/${style}.svg?color=${
    color?.substr(1) || "ffffff"
  }&blur=15`;
};

const STYLES_MAP = {
  [HOTSPOT_TYPES.URL]: "skin_linkspot",
  [HOTSPOT_TYPES.INFO]: "skin_infospot",
  [HOTSPOT_TYPES.LINK]: "skin_drag",
  [HOTSPOT_TYPES.GALLERY]: "skin_gallery",
  [HOTSPOT_TYPES.PRODUCT]: "skin_product",
  [HOTSPOT_TYPES.FLAT]: "skin_flatspot",
};

const STYLES_MAP_ACTIVE = {
  [HOTSPOT_TYPES.URL]: "skin_linkspot_active",
  [HOTSPOT_TYPES.INFO]: "skin_infospot_active",
  [HOTSPOT_TYPES.LINK]: "skin_drag_active",
  [HOTSPOT_TYPES.GALLERY]: "skin_gallery_active",
  [HOTSPOT_TYPES.PRODUCT]: "skin_product_active",
  [HOTSPOT_TYPES.FLAT]: "skin_flatspot_active",
};

export const useAddHotspot = (): ((hotspot: Hotspot) => void) => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;

  return useCallback(
    (hotspot) => {
      const hotspotName = hotspot.id || TMP_HOTSPOT_NAME;
      const hs = `hotspot[${hotspotName}]`;

      krpano.call(`addhotspot(${hotspotName})`);

      krpano.set(`${hs}.ath`, hotspot.ath);
      krpano.set(`${hs}.atv`, hotspot.atv);
      krpano.set(`${hs}.tooltip`, hotspot.name || "");
      krpano.set(`${hs}.url`, getHotspotIconUrl(hotspot));

      if (hotspot.type === HOTSPOT_TYPES.LINK) {
        krpano.set(`${hs}.linkedscene`, hotspot.content);
        krpano.set(
          `${hs}.scale`,
          hotspot.hasOwnProperty("width") ? hotspot.width : "0.26"
        );
      } else {
        krpano.set(
          `${hs}.scale`,
          hotspot.hasOwnProperty("size") ? String(hotspot.size) : "0.26"
        );
      }

      if (hotspot.type === HOTSPOT_TYPES.FLAT) {
        krpano.set(`${hs}.width`, hotspot.width);
        krpano.set(`${hs}.height`, hotspot.height);
      }

      if (hotspot.id) {
        krpano.call(`${hs}.loadstyle('${STYLES_MAP[hotspot.type]}')`);
      } else {
        krpano.set(`${hs}.active`, true);
        krpano.set(`${hs}.isNew,`, true);
        krpano.set(`${hs}.draggable`, true);
        krpano.call(`${hs}.loadstyle('${STYLES_MAP_ACTIVE[hotspot.type]}')`);
      }
    },
    [krpano]
  );
};
