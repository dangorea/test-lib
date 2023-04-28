import React, { FC } from "react";
import { isFullAccess, redirectOpenBillingPage } from "../../utils/premium";
import { PremiumBtn } from "./styles";
import { useSelector } from "react-redux";
import { getUserConfig } from "../../store/config/selectors";

const UpgradeButton: FC = () => {
  const userConfig = useSelector(getUserConfig());
  if (!isFullAccess(userConfig.id)) {
    return null;
  }

  return <PremiumBtn onClick={redirectOpenBillingPage}>Upgrade</PremiumBtn>;
};

export default UpgradeButton;
