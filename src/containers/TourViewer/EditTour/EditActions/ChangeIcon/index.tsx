import { FC, useEffect } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { getKrpanoInterface } from "../../../../../store/viewer/selectors";
import type { Krpano } from "../../../../../utils/config";
import { useDebouncedCallback } from "use-debounce";
import { getHotspotIconUrl } from "../../../../../utils/hooks/useAddHotspot";
import type { Hotspot } from "../../../../../store/tours/types";
import { HOTSPOT_TYPES } from "../../../../../store/tours/types";

type Props = {
  hotspotType?: string;
};

const ChangeIcon: FC<Props> = (hotspotType) => {
  const { values } = useFormikContext<{
    id: string;
    icon: string;
    color: string;
    content: string;
    target: string;
    type: string;
    width: string;
    height: string;
    size: string;
  }>();
  const krpano = useSelector(getKrpanoInterface()) as Krpano;

  const debouncedChangeIcon = useDebouncedCallback(() => {
    krpano.set(
      `hotspot[${values.id}].url`,
      getHotspotIconUrl({
        style: values.icon,
        color: values.color,
        content: values.content,
        target: values.target,
        type: hotspotType.hotspotType || values.type,
      } as Hotspot)
    );

    if (hotspotType.hotspotType === HOTSPOT_TYPES.LINK) {
      krpano.set(`hotspot[${values.id}].scale`, String(values.width));
    }

    if (hotspotType.hotspotType === HOTSPOT_TYPES.FLAT) {
      krpano.set(`hotspot[${values.id}].width`, values.width);
      krpano.set(`hotspot[${values.id}].height`, values.height);
    }

    values.size &&
      krpano.set(`hotspot[${values.id}].scale`, String(values.size));
  }, 300);

  useEffect(() => {
    debouncedChangeIcon();
  }, [
    debouncedChangeIcon,
    krpano,
    values.color,
    values.icon,
    values.content,
    values.type,
    values.width,
    values.height,
    values.size,
    values.target,
  ]);

  return null;
};

export default ChangeIcon;
