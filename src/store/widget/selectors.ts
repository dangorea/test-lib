import type { RootState } from "../types";
import type { Font, WidgetSettings } from "./types";

export const getFonts =
  () =>
  (state: RootState): Array<Font> => {
    return state.widget.fonts;
  };

export const getWidgetTourId =
  () =>
  (state: RootState): WidgetSettings["manageTours"] => {
    return state.widget.data.manageTours;
  };

export const getWidgetBorder =
  () =>
  (state: RootState): Partial<WidgetSettings> => {
    const { showBorder, borderColor, borderWidth } = state.widget.data;
    return { showBorder, borderColor, borderWidth };
  };

export const getWidgetAutoplayTour =
  () =>
  (state: RootState): WidgetSettings["autostart"] => {
    return state.widget.data.autostart;
  };

export const getWidgetTourTitleSettings =
  () =>
  (state: RootState): Partial<WidgetSettings> => {
    return {
      tfa: state.widget.data.tfa,
      showTitle: state.widget.data.showTitle,
    };
  };

export const getWidgetImageTitleSettings =
  () =>
  (state: RootState): Partial<WidgetSettings> => {
    return {
      photoData: state.widget.data.photoData,
      spt: state.widget.data.spt,
    };
  };
export const getWidgetAllSettings =
  () =>
  (state: RootState): WidgetSettings => {
    return state.widget.data;
  };
