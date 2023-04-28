import type { Hotspot, LinkHotspot } from "../store/tours/types";
import { HOTSPOT_TYPES, ProductHotspot } from "../store/tours/types";
import type { Tour } from "./types";

export const getHotspotFromTour = (
  tour: Tour,
  hotspotId: string
): Hotspot | void => {
  const sphereId = hotspotId.split("_")[0];

  const sphere = tour.spheres.find(({ id: sId }) => sId === sphereId);

  return sphere?.hotSpots.find(({ id: hId }) => hId === hotspotId);
};

export const getProductHotspotFromTour = (
  tour: Tour,
  productId: string,
  imageId: string
): ProductHotspot | void => {
  const sphereId = imageId;
  const sphere = tour.spheres.find(({ id: sId }) => sId === sphereId);

  return sphere?.wixProducts.find(({ id: pId }) => pId === productId);
};

export const getLinkToImageHotspotFromTour = (
  tour: Tour,
  hotspotId: string
): LinkHotspot | void => {
  const sphereId = hotspotId.split("_")[0];

  const sphere = tour.spheres.find(({ id: sId }) => sId === sphereId);

  return sphere?.links.find(({ id: hId }) => hId === hotspotId);
};

export const getHotspotFromLinkHotspot = (
  linkHotspot: LinkHotspot
): Hotspot => ({
  ...linkHotspot,
  name: linkHotspot.title,
  type: HOTSPOT_TYPES.LINK,
  content: linkHotspot.target,
  hotspotStartingPoint: linkHotspot.hotspotStartingPoint,
});

export const getHotspotFromProductHotspot = (
  productHotspot: ProductHotspot
): Hotspot => ({
  ...productHotspot,
  name: productHotspot.title,
  type: HOTSPOT_TYPES.PRODUCT,
  content: productHotspot.wixProductId,
});

export const transformFullTourSphereLinks = (tour: Tour): Tour => {
  if (!tour) {
    return tour;
  }
  tour.spheres.forEach((sphere) => {
    const links = sphere.links.map((link) => getHotspotFromLinkHotspot(link));
    const products = sphere.wixProducts.map((product) =>
      getHotspotFromProductHotspot(product)
    );
    sphere.hotSpots = sphere.hotSpots.concat(links, products);
  });
  return tour;
};

export const trimString = (string: string, length: number) => {
  return string.length > length ? string?.substring(0, length) + "..." : string;
};
