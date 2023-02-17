import React, { FC, ReactElement } from "react";
// import { useLocation } from "react-router-dom";

import { Container, Content } from "./styles";

import Notifications from "../Notifications";

// const urlsWithoutSidebar = ["/widget", "/new-widget"];

type Props = {
  children: ReactElement;
};
const Layout = ({ children }: Props) => {
  // const location = useLocation();

  const CommonLayout: FC = () => (
    <>
      <Notifications />
      <Content>{children}</Content>
    </>
  );

  return (
    <Container>
      <>
        <CommonLayout />
      </>
    </Container>
  );
};

export default Layout;
