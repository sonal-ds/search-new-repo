import * as React from "react";
import { siteLogo } from "../../sites-global/global";

type HeaderProps = {
  _site: any;
};

const Nav = ({ _site }: HeaderProps) => {
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle(
      "menu-opened"
    );
  };

  return (
    <>
      <div className="nav-header">
        <div className="header new-hdr site-header pb-6">
          {/* left nav starts  here*/}
          <div className="centered-container">
            {/* drawer starts */}
            <button
              type="button"
              className="menu-btn"
              id="menu-btn"
              onClick={toggle}
            >
              <div className="menu-icon-box">
                <div className="menu-icon-inner"></div>
              </div>
            </button>

            <div className="mob-nav">
              <div className="flex gap-x-4 items-center  justify-between w-full">
                <a href="https://greenmotion.com/" target="_blank" rel="noreferrer">
                  <img src={siteLogo}></img>
                </a>
                <ul className="navbar-nav">
                  {_site?.c_headerNavigation?.map(
                    (item: any, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          <li className="flex gap-x-4 text-sm font-semibold text-body">
                            <a href={item?.url}>{item?.label}</a>
                          </li>
                        </React.Fragment>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>

            <div className="main-nav-op"></div>
          </div>
        </div>
        <div className="main-nav">
          <ul className="mobile_nav primary-nav">
            
            {_site?.c_headerNavigation?.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <li className="flex gap-x-4 text-sm font-semibold text-body">
                    <a href={item?.url} key={index}>
                      {item?.label}
                    </a>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
