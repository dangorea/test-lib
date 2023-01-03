import Wix from "wix-sdk";
import { CONFIG, USER_TYPES } from "./config";

export const redirectOpenBillingPage = (): WindowProxy | null =>
  window.open(
    `https://www.wix.com/apps/upgrade/149643e5-c561-5783-a15a-41681dd73290?appInstanceId=${Wix.Utils.getInstanceId()}`
  );

export const isDefault = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.DEFAULT;

export const isDemo = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.DEMO;

export const isTrial = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.TRIAL;

export const isBasic = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.BASIC;

export const isPremium = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.PRO;

export const isPro2 = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.PRO2;

export const isAgency = (userType: USER_TYPES): boolean =>
  userType === USER_TYPES.AGENCY;

export const isFullAccess = (userType: USER_TYPES): boolean => {
  const VALID_USER_TYPES = [USER_TYPES.DEMO, USER_TYPES.AGENCY];
  return VALID_USER_TYPES.includes(userType);
};

export const tourLimiter = (
  userType: USER_TYPES,
  toursQuantity: number
): boolean => {
  const VALID_USER_TYPES = [
    USER_TYPES.TRIAL,
    USER_TYPES.BASIC,
    USER_TYPES.BASIC1,
    USER_TYPES.PRO,
    USER_TYPES.PRO2,
  ];
  if (VALID_USER_TYPES.includes(userType)) {
    if (toursQuantity <= CONFIG.subscriptionPlan.tourLimit) {
      return true;
    }
  }
  return false;
};

export const sphereLimiter = (
  userType: USER_TYPES,
  sphereQuantity: number
): boolean => {
  const VALID_USER_TYPES = [
    USER_TYPES.TRIAL,
    USER_TYPES.BASIC,
    USER_TYPES.BASIC1,
  ];
  if (VALID_USER_TYPES.includes(userType)) {
    if (sphereQuantity <= CONFIG.subscriptionPlan.sphereLimitPerTour) {
      return true;
    }
  }
  return false;
};

export const unlimitedSphere = (userType: USER_TYPES) => {
  const VALID_USER_TYPES = [USER_TYPES.PRO, USER_TYPES.PRO2, USER_TYPES.AGENCY];
  return VALID_USER_TYPES.includes(userType);
};
