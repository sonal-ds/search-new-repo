import * as React from "react";
import classNames from "classnames";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import KebabIcon from "../../icons/kebab.svg";
import {  useSearchState } from "@yext/search-headless-react";
import { universalResultsConfig } from "../../config/universalResultsConfig";

import usePageSetupEffect from "../../hooks/usePageSetupEffect";
import { CompositionMethod } from "../interface/interface";
import { useComposedCssClasses } from "@yext/search-ui-react";


interface NavigationCssClasses {
  nav?: string;
  linksWrapper?: string;
  menuWrapper?: string;
  navLinkContainer?: string;
  navLinkContainer___active?: string;
  navLink?: string;
  kebabIcon?: string;
  menuButton?: string;
  menuButtonContainer?: string;
  menuButton___menuOpen?: string;
  menuButton___hasActiveLink?: string;
  menuContainer?: string;
  menuNavLink?: string;
  menuNavLinkContainer?: string;
  menuNavLinkContainer___active?: string;
}

const builtInCssClasses: NavigationCssClasses = {
  nav: "vertical-navigation",
  navLinkContainer: "vertical-navigation-item",
  navLink: "vertical-nav-link",
  navLinkContainer___active: "active",
  kebabIcon: "pointer-events-none",
  menuButtonContainer: "relative flex flex-grow justify-end mr-4",
  menuButton:
    "flex items-center text-gray-600 font-medium text-md h-12 mt-1 p-3 border-opacity-0 rounded-md hover:bg-gray-200",
  menuButton___menuOpen: "bg-gray-100 text-gray-800",
  menuButton___hasActiveLink: "text-blue-600",
  menuContainer:
    "absolute flex-col bg-white border top-14 py-2 rounded-lg shadow-lg side-menu",
  menuNavLink: "px-4 py-2 flex-grow",
  menuNavLinkContainer:
    "flex text-gray-600 hover:bg-gray-100 text-lg hover:text-gray-800 focus:text-gray-800",
  menuNavLinkContainer___active:
    "text-blue-600 hover:text-blue-600 focus:text-blue-600",
};
interface LinkData {
  to: string;
  label: string;
}

interface NavigationProps {
  customCssClasses?: NavigationCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export default function Navigation({
  customCssClasses,
}: NavigationProps) {
  const [navparmam, setNavParam] = useState("");

  // Default Search Code - Ends
  const links = [
    {
      to: "/index",
      label: "All",
    },
    ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
      to: verticalKey,
      label: config.label || verticalKey,
    })),
  ];

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const currentVertical = useSearchState((state) => state.vertical.verticalKey);
  const query = useSearchState((state) => state.query.input);

  useEffect(() => {
    setNavParam(query || "");
  }, [query]);

  if (currentVertical === "faqs") {
    usePageSetupEffect(currentVertical, 6);
  } else if (currentVertical === "locations") {
    usePageSetupEffect(currentVertical, 10);
  }

  // Close the menu when clicking the document
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const handleDocumentClick = (e: MouseEvent) => {
    if (e.target !== menuRef.current) {
      setMenuOpen(false);
    }
  };
  useLayoutEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Responsive tabs
  const [numOverflowLinks, setNumOverflowLinks] = useState(0);
  const navigationRef = useRef<HTMLDivElement>(null);
  const handleResize = useCallback(() => {
    const navEl = navigationRef.current;
    if (!navEl) {
      return;
    }
    const isOverflowing = navEl.scrollWidth > navEl.offsetWidth;
    if (isOverflowing && numOverflowLinks < links.length) {
      setNumOverflowLinks(numOverflowLinks + 1);
    }
  }, [links.length, numOverflowLinks]);
  useLayoutEffect(handleResize, [handleResize]);

  const visibleLinks = links.slice(0, links.length - numOverflowLinks);

  const overflowLinks = links.slice(-numOverflowLinks);
  const isActiveLink = ({ to }: LinkData) => {
    return to === currentVertical || (to === "/index" && !currentVertical);
  };
  const activeVisibleLinkIndex = visibleLinks.findIndex(isActiveLink);
  const activeMenuLinkIndex = overflowLinks.findIndex(isActiveLink);
  const menuContainsActiveLink = activeMenuLinkIndex >= 0;
  const menuButtonClassNames = classNames(cssClasses.menuButton, {
    [cssClasses.menuButton___menuOpen ?? ""]: menuOpen,
    [cssClasses.menuButton___hasActiveLink ?? ""]: menuContainsActiveLink,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setActiveIndex(activeVisibleLinkIndex);
  }, [activeVisibleLinkIndex]);

  return (
    <nav className={cssClasses.nav} ref={navigationRef}>
      <ul>
        {visibleLinks.map((l, index) =>
          renderLink(l, index == activeIndex, cssClasses, navparmam, index)
        )}
        {numOverflowLinks > 0 && (
          <div className={cssClasses.menuButtonContainer}>
            <button
              className={menuButtonClassNames}
              ref={menuRef}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img src={KebabIcon} className={cssClasses.kebabIcon} /> More
            </button>
            {menuOpen && (
              <div className={cssClasses.menuContainer}>
                {menuOpen &&
                  overflowLinks.map((l, index) => {
                    return renderLink(
                      l,
                      index === activeMenuLinkIndex,
                      {
                        navLink: cssClasses.menuNavLink,
                        navLinkContainer: cssClasses.menuNavLinkContainer,
                        navLinkContainer___active:
                          cssClasses.menuNavLinkContainer___active,
                      },
                      navparmam,
                      index
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
}

function renderLink(
  linkData: LinkData,
  isActiveLink: boolean,
  cssClasses: {
    navLinkContainer?: string;
    navLinkContainer___active?: string;
    navLink?: string;
  },
  navparmam: any,
  index: string
) {
  const list: { [index: string]: string } = {
    All: "All",
    Locations: "LOCATIONS",
    FAQs: "FAQ's",
    "Terms and Conditions": "TERMS & CONDITIONS",
  };

  const { to, label } = linkData;
  const navLinkContainerClasses = isActiveLink
    ? cssClasses.navLinkContainer___active
    : "";
  return (
    <li
      className={`vertical-navigation-item ${navLinkContainerClasses}`}
      key={index.toString()}
    >
      <a className={cssClasses.navLink} href={`${to}?query=${navparmam}`}>
        {list[label]}
      </a>
    </li>
  );
}
