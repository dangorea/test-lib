import type { CommonState } from "../types";
export interface Font {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: {
    regular: string;
    italic: string;
  };
  category: string;
  kind: string;
}

export interface State extends CommonState {
  data: WidgetSettings;
  fonts: Array<Font>;
}

export type WidgetSettings = {
  autostart: boolean;
  hdl: boolean;
  showTitle: boolean;
  spt: boolean;
  showVr: boolean;
  sn: boolean;
  manageTours: string;
  source: string;
  showBorder: boolean;
  borderColor: {
    color: string;
    opacity: number;
  };
  borderWidth: number;
  tfa: {
    color: string;
    opacity: number;
    editorKey: string;
    family: string;
    fontStyleParam: boolean;
    preset: string;
    size: number;
    style: {
      bold: boolean;
      italic: boolean;
      underline: boolean;
    };
    value: string;
  };
  photoData: {
    color: string;
    opacity: number;
    editorKey: string;
    family: string;
    fontStyleParam: boolean;
    preset: string;
    size: number;
    style: {
      bold: boolean;
      italic: boolean;
      underline: boolean;
    };
    value: string;
  };
  [key: string]: any;
};
