import React, { FC } from "react";
// import { Button } from "wix-style-react";
import { CONFIG } from "../../utils/config";
import { isFullAccess, redirectOpenBillingPage } from "../../utils/premium";
import { PremiumBtn } from "./styles";

const UpgradeButton: FC = () => {
  if (!isFullAccess(CONFIG.subscriptionPlan.id)) {
    return null;
  }

  return <PremiumBtn onClick={redirectOpenBillingPage}>Upgrade</PremiumBtn>;
};

export default UpgradeButton;
