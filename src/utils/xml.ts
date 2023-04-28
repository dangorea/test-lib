import { Image360, SPHERE_TYPES, StartingPoint } from "./types";
import type { Tour } from "./types";
import { CONFIG } from "./config";
import skinsXml from "./spotsStyleXml";

export const spreadToAttrs = (obj: Record<any, any>): string => {
  return Object.entries(obj).reduce(
    (acc, [key, val]) => `${acc} ${key}="${String(val)}"`,
    ""
  );
};

export const generateImageXml = (image: Image360): string => {
  const {
    image: { levels, ...imageAttrs },
    id,
  } = image;

  let levelsString = "";

  if (image.image?.type === SPHERE_TYPES.CUBE) {
    levelsString = levels.reduce(
      (acc, l) =>
        acc +
        `<level tiledimagewidth="${l.tiledimagewidth}"
                  tiledimageheight="${l.tiledimageheight}">
             <cube url="${CONFIG.storageUrl}/spheres/${id}/tiles/${l.cube.url}" />
           </level>`,
      ""
    );
  }

  if (image.image?.type === SPHERE_TYPES.CYLINDER) {
    levelsString = levels.reduce(
      (acc, l, i) =>
        acc +
        `<level tiledimagewidth="${l.tiledimagewidth}"
                  tiledimageheight="${l.tiledimageheight}">
             <cylinder url="${CONFIG.storageUrl}/spheres/${id}/tiles/l${
          image.image.levels.length - i
        }/${l.cylinder.url}?${image.updatedAt}" />
           </level>`,
      ""
    );
  }

  if (image.image?.type === SPHERE_TYPES.SPHERE) {
    levelsString = levels.reduce(
      (acc, l, i) =>
        acc +
        `<level tiledimagewidth="${l.tiledimagewidth}"
                  tiledimageheight="${l.tiledimageheight}">
             <sphere url="${CONFIG.storageUrl}/spheres/${id}/tiles/l${
          image.image.levels.length - i
        }/${l.sphere.url}" />
           </level>`,
      ""
    );
  }

  return `
    <preview url='${CONFIG.storageUrl}/spheres/${id}/tiles/preview.jpg' />"
    <image ${spreadToAttrs(imageAttrs)}>
      ${levelsString}
    </image>
  `;
};

export const generateViewXml = (
  image: Image360,
  startingPoint?: StartingPoint
  // isAutoplay?: boolean
): string => {
  const { view, startingPoint: imageStartingPoint } = image;
  const sp = startingPoint || imageStartingPoint;

  // const viewForLittlePlanetIntro = {
  //   fisheye: '1.0',
  //   hlookat: '123.0',
  //   vlookat: '90',
  //   fov: '150',
  //   fovmax: '150',
  //   distortion: '1.0',
  // };

  const normalView = {
    hlookat: sp.ath,
    vlookat: sp.atv,
    fov: sp.fov,
    distortion: "0.0",
    pannini: "0.0",
    architectural: "0.0",
  };

  // const customLittlePlanetIntro = `
  //   <action name="custom_little_planet_intro">
  //     tween(view.hlookat, ${sp.ath}, 2.5, easeInOutQuad );
  //     tween(view.vlookat, ${sp.atv}, 2.5, easeInOutQuad );
  //     tween(view.fov, ${sp.fov}, 2.5, easeInOutQuad );
  //     tween(view.fovmax, 120);
  //     tween(view.fisheye, 0, 2.5, easeInOutQuad);
  //     tween(view.architectural, 0, 2.5, easeInOutQuad);
  //     tween(distortion, 0.0);
  //     tween(pannini, 0.0);
  //   </action>
  // `;

  const viewAttrs = sp
    ? {
        ...view,
        stereographic: true,
        ...normalView,
        // ...(!isInitialLoaded && startingPoint && isAutoplay
        //   ? viewForLittlePlanetIntro
        //   : normalView),
      }
    : view;

  // if (startingPoint) {
  //   isInitialLoaded = true;
  // }

  return `
    <view ${spreadToAttrs(viewAttrs)} /> 
  `;
};

export const generateInitialXml = (image: Image360): string => {
  // todo remove debug mode
  return `
    <krpano logkey="true" debugmode="true">
      ${generateImageXml(image)}
      ${generateViewXml(image)}
      ${skinsXml()}
    </krpano>
  `;
};

export const generateInitialTourXml = (
  tour: Tour,
  sphereType?: SPHERE_TYPES
  // isAutoplay?: boolean
): string => {
  const imagesScenes = tour.spheres.reduce((acc, image) => {
    const isStartingPoint = tour.startingPoint.sphereId === image.id;
    return (
      acc +
      `
    <scene name="${image.id}" autoload="${isStartingPoint ? "true" : "false"}">
      ${generateImageXml(image)}
      ${generateViewXml(
        image,
        isStartingPoint ? tour.startingPoint : undefined
        // isAutoplay
      )}
    </scene>
  `
    );
  }, "");

  // todo remove debug mode
  return `
    <krpano logkey="true" debugmode="false">
    <include url="%SWFPATH%/plugins/ios_iframe_fullscreen.xml" />
      ${skinsXml((sphereType as SPHERE_TYPES) ?? SPHERE_TYPES.CUBE)}
      ${imagesScenes}
    </krpano>
  `;
};
