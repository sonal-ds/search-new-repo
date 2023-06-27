import * as React from "react";
import Footer from "./footer";
import Nav from "./commons/Nav";

type Props = {
  _site: any;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Nav _site={_site} />
      {children}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
