import * as React from "react";
import { siteLogo } from "../sites-global/global";
import googleplay_icon from "../images/google-play.svg";
import app_icon from "../images/app-store.svg";


type HeaderProps = {
  _site: any;
};

const Footer = ({ _site }: HeaderProps) => {
  const toggle = () => {
    (document.getElementById("drop_link") as HTMLInputElement).classList.toggle(
      "menu-opened1"
    );
  };

  return (
    <footer className="">
      <div className="centered-container">
        <div className="flex flex-col flex-wrap justify-center  md:flex-row">
          <div className="w-full px-[0.938rem] py-[2.188rem] rounded-b-lg bg-blueGray-50 border-b-[0.125rem] border-[#f6f6f6] order-contact">
            <div className="inline-flex flex-wrap items-center mx-auto flex-row">
              <svg
                width="24"
                height="43"
                viewBox="0 0 24 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.0667 42H3.93333C2.3134 42 1 40.7259 1 39.1544V3.84564C1 2.27342 2.3134 1 3.93333 1H20.0667C21.6866 1 23 2.27342 23 3.84564V39.1544C23 40.7259 21.6866 42 20.0667 42Z"
                  fill="#F5F9EB"
                />
                <path
                  d="M20.0668 42.9H3.93343C1.82245 42.9 0.100098 41.2291 0.100098 39.1543V3.84562C0.100098 1.77034 1.82223 0.0999756 3.93343 0.0999756H20.0668C22.178 0.0999756 23.9001 1.77034 23.9001 3.84562V39.1543C23.9001 41.2291 22.1777 42.9 20.0668 42.9ZM20.0668 41.1C21.1957 41.1 22.1001 40.2226 22.1001 39.1543V3.84562C22.1001 2.77695 21.1959 1.89998 20.0668 1.89998H3.93343C2.80426 1.89998 1.9001 2.77695 1.9001 3.84562V39.1543C1.9001 40.2226 2.80454 41.1 3.93343 41.1H20.0668Z"
                  fill="#AAD12D"
                />
                <path d="M1 6.91108H23V5.11108H1V6.91108Z" fill="#AAD12D" />
                <path d="M1 35.1555H23V33.3555H1V35.1555Z" fill="#AAD12D" />
                <path
                  d="M14.7333 37.9C14.7333 39.1535 13.7138 40.1666 12.458 40.1666C11.2027 40.1666 10.1833 39.1533 10.1833 37.9C10.1833 36.6471 11.2029 35.6333 12.458 35.6333C13.7136 35.6333 14.7333 36.647 14.7333 37.9ZM12.9333 37.9C12.9333 37.6435 12.7219 37.4333 12.458 37.4333C12.1948 37.4333 11.9833 37.6435 11.9833 37.9C11.9833 38.1568 12.1945 38.3666 12.458 38.3666C12.7222 38.3666 12.9333 38.1568 12.9333 37.9Z"
                  fill="#AAD12D"
                />
              </svg>

              <ul className="footer-contact">
                {_site?.c_phoneNumber?.phone?.map(
                  (item: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <li>
                          <a href={`tel:${item?.number}`}>
                            <b>{item?.code}</b>
                            {item?.number}
                          </a>
                        </li>
                      </React.Fragment>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
          <div className="gm-footer-sharing">
            <a
              className="text-black hover:text-blue-500"
              href={_site?.c_footerSocialIcon[0].url}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.17798 8.4375L8.59458 5.72285H5.9898V3.96123C5.9898 3.21855 6.35366 2.49463 7.52026 2.49463H8.70444V0.183398C8.70444 0.183398 7.62983 0 6.60239 0C4.45728 0 3.05513 1.3002 3.05513 3.65391V5.72285H0.670654V8.4375H3.05513V15H5.9898V8.4375H8.17798Z"
                  fill="#AAD12D"
                />
              </svg>
            </a>
            <a
              href={_site?.c_footerSocialIcon[1].url}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_93_1293)">
                  <path
                    d="M2.93789 13.125H0.216797V4.36232H2.93789V13.125ZM1.57588 3.167C0.705762 3.167 0 2.4463 0 1.57618C6.22793e-09 1.15823 0.16603 0.757404 0.461564 0.461869C0.757099 0.166335 1.15793 0.000305176 1.57588 0.000305176C1.99383 0.000305176 2.39466 0.166335 2.69019 0.461869C2.98573 0.757404 3.15176 1.15823 3.15176 1.57618C3.15176 2.4463 2.4457 3.167 1.57588 3.167ZM13.1221 13.125H10.4068V8.85939C10.4068 7.84278 10.3863 6.53907 8.99209 6.53907C7.57734 6.53907 7.36055 7.64357 7.36055 8.78614V13.125H4.64238V4.36232H7.25215V5.55763H7.29023C7.65352 4.86915 8.54092 4.14259 9.86484 4.14259C12.6187 4.14259 13.125 5.95607 13.125 8.31153V13.125H13.1221Z"
                    fill="#AAD12D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_93_1293">
                    <rect width="13.125" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href={_site?.c_footerSocialIcon[2].url}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="17"
                height="13"
                viewBox="0 0 17 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.1032 2.63524C15.9192 1.94237 15.377 1.39669 14.6886 1.2115C13.4409 0.875 8.43751 0.875 8.43751 0.875C8.43751 0.875 3.43419 0.875 2.18641 1.2115C1.49802 1.39672 0.95585 1.94237 0.771836 2.63524C0.4375 3.89111 0.4375 6.51137 0.4375 6.51137C0.4375 6.51137 0.4375 9.13162 0.771836 10.3875C0.95585 11.0804 1.49802 11.6033 2.18641 11.7885C3.43419 12.125 8.43751 12.125 8.43751 12.125C8.43751 12.125 13.4408 12.125 14.6886 11.7885C15.377 11.6033 15.9192 11.0804 16.1032 10.3875C16.4375 9.13162 16.4375 6.51137 16.4375 6.51137C16.4375 6.51137 16.4375 3.89111 16.1032 2.63524ZM6.80113 8.89036V4.13237L10.9829 6.51143L6.80113 8.89036Z"
                  fill="#AAD12D"
                />
              </svg>
            </a>
            <a
              href={_site?.c_footerSocialIcon[3].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.56543 4.13086C4.70215 4.13086 3.19922 5.63379 3.19922 7.49707C3.19922 9.36035 4.70215 10.8633 6.56543 10.8633C8.42871 10.8633 9.93164 9.36035 9.93164 7.49707C9.93164 5.63379 8.42871 4.13086 6.56543 4.13086ZM6.56543 9.68555C5.36133 9.68555 4.37695 8.7041 4.37695 7.49707C4.37695 6.29004 5.3584 5.30859 6.56543 5.30859C7.77246 5.30859 8.75391 6.29004 8.75391 7.49707C8.75391 8.7041 7.76953 9.68555 6.56543 9.68555ZM10.8545 3.99316C10.8545 4.42969 10.5029 4.77832 10.0693 4.77832C9.63281 4.77832 9.28418 4.42676 9.28418 3.99316C9.28418 3.55957 9.63574 3.20801 10.0693 3.20801C10.5029 3.20801 10.8545 3.55957 10.8545 3.99316ZM13.084 4.79004C13.0342 3.73828 12.7939 2.80664 12.0234 2.03906C11.2559 1.27148 10.3242 1.03125 9.27246 0.978516C8.18848 0.916992 4.93945 0.916992 3.85547 0.978516C2.80664 1.02832 1.875 1.26855 1.10449 2.03613C0.333984 2.80371 0.0966797 3.73535 0.0439453 4.78711C-0.0175781 5.87109 -0.0175781 9.12012 0.0439453 10.2041C0.09375 11.2559 0.333984 12.1875 1.10449 12.9551C1.875 13.7227 2.80371 13.9629 3.85547 14.0156C4.93945 14.0771 8.18848 14.0771 9.27246 14.0156C10.3242 13.9658 11.2559 13.7256 12.0234 12.9551C12.791 12.1875 13.0313 11.2559 13.084 10.2041C13.1455 9.12012 13.1455 5.87402 13.084 4.79004ZM11.6836 11.3672C11.4551 11.9414 11.0127 12.3838 10.4355 12.6152C9.57129 12.958 7.52051 12.8789 6.56543 12.8789C5.61035 12.8789 3.55664 12.9551 2.69531 12.6152C2.12109 12.3867 1.67871 11.9443 1.44727 11.3672C1.10449 10.5029 1.18359 8.45215 1.18359 7.49707C1.18359 6.54199 1.10742 4.48828 1.44727 3.62695C1.67578 3.05273 2.11816 2.61035 2.69531 2.37891C3.55957 2.03613 5.61035 2.11523 6.56543 2.11523C7.52051 2.11523 9.57422 2.03906 10.4355 2.37891C11.0098 2.60742 11.4521 3.0498 11.6836 3.62695C12.0264 4.49121 11.9473 6.54199 11.9473 7.49707C11.9473 8.45215 12.0264 10.5059 11.6836 11.3672Z"
                  fill="#AAD12D"
                />
              </svg>
            </a>
          </div>
          <div className="footer_1">
            <div className="gm-footer-logo">
              <a
                href="https://greenmotion.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={siteLogo}></img>
              </a>
            </div>
            <div className="gm-footer-apps">
              <a
                href={_site?.c_footerIconAndApp?.app[0]?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={googleplay_icon} alt="" />
              </a>
              <a
                href={_site?.c_footerIconAndApp?.app[1]?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={app_icon} alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className="gm-footer-about">
          <p className="mx-auto text-sm text-center text-black sm:text-left ">
            <p> {_site?.c_footerDescription?.line1} </p>
            <p>{_site?.c_footerDescription?.line2}</p>
            <p className="!mb-0">{_site?.c_footerDescription?.line3} </p>
            <p>{_site?.c_footerDescription?.line4} </p>
            <p>{_site?.c_footerDescription?.line5}</p>
          </p>
        </div>
      </div>

      <div className="nav-header">
        <div className="header new-hdr site-header pb-6 footer_link">
          {/* left nav starts  here*/}
          <div className="centered-container">
            <div id="drop_link">
              <button
                type="button"
                className="menu-btn menu-link"
                id="menu-btn"
                onClick={toggle}
              >
                <div className="menu-icon-box">
                  <div className="icon-inner2"></div>
                </div>
              </button>
              <div className="gm-footer-links mb-5">
                <div className="centered-container">
                  <ul>
                    {_site?.c_headerNavigation?.map(
                      (item: any, index: number) => {
                        return (
                          <React.Fragment key={index}>
                          <li>
                            <a
                              href={item.url}
                              key={index}
                              rel="noopener noreferrer"
                            >
                              {item?.label}
                            </a>
                          </li>
                          </React.Fragment>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gm-footer-links mb-5">
        <div className="centered-container">
          <ul>
            {_site?.c_headerNavigation?.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <li>
                    <a href={item.url}>{item?.label}</a>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
