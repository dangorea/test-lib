import Wix from "wix-sdk";
import { USER_TYPES } from "./config";

export const redirectOpenBillingPage = (): WindowProxy | null =>
  window.open(
    `https://www.wix.com/apps/upgrade/149643e5-c561-5783-a15a-41681dd73290?appInstanceId=${Wix.Utils.getInstanceId()}`
  );

export const isDefault = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.DEFAULT;

export const isFullAccess = (userType: USER_TYPES): boolean => {
  const VALID_USER_TYPES = [USER_TYPES.DEMO, USER_TYPES.AGENCY];
  return VALID_USER_TYPES.includes(userType);
};
