// declare module "*.svg" {
//   import * as React from "react";
//
//   export const ReactComponent: React.FunctionComponent<
//     React.SVGProps<SVGSVGElement>
//   > & { title?: string };
//
//   const src: string;
//   export default src;
// }

declare module "*.png";
declare module "*.svg";

declare module "wix-ui-icons-common";

declare module "wix-sdk";

declare module "react-quill";

// declare module "*.svg" {
//   const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//   export default content;
// }

// declare module "redux" {
//   export interface Dispatch<A extends Action = AnyAction> {
//     <T extends A>(action: T | Dispatch): T | Promise<T> | Promise<void>;
//   }
// }
