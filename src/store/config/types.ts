import type { SUBSCRIPTION_PLAN } from "../../utils/types";

export type State = {
  source: string;
  bucket: string;
  onClose: () => void;
  userConfig: SUBSCRIPTION_PLAN;
};
