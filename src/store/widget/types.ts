import type { CommonState } from '../types';
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
  spt: boolean; // show photoTitle
  showVr: boolean;
  sn: boolean; // show navigation
  manageTours: string;
  source: string;
  showBorder: boolean;
  borderColor: {
    color: string;
    opacity: number;
  };
  borderWidth: number;
  tfa: {
    // settings of tour title (titleFontAndColor)
    color: string;
    opacity: number;
    editorKey: string; //font headings(h1, h2, h3, h4, h5, h6) and paragraphs
    family: string; //font family
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
    // settings of sphere title
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
