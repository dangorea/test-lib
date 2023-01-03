import type { Krpano } from "../../utils/config";
import type { TOUR_MODES } from "./constants";

export type State = {
  imageId: string | null;
  interfaceObj: Krpano | null;
  secondInterfaceObj: Krpano | null;
  tourId: string | null;
  tourMode: TOUR_MODES;
  widgetView: boolean;
};
