import * as React from "react";
import { useSearchState } from "@yext/search-headless-react";
import map_marker from "../images/location.svg";
import faqImage from "../images/faq.svg";
import helpArticle from "../images/article.svg";
import classNames from "classnames";
import {
  AppliedFiltersCssClasses,
  AppliedFiltersProps,
  useComposedCssClasses,
} from "@yext/search-ui-react";

interface SectionHeaderCssClasses extends AppliedFiltersCssClasses {
  sectionHeaderContainer?: string;
  sectionHeaderIconContainer?: string;
  sectionHeaderLabel?: string;
  viewMoreContainer?: string;
  viewMoreLink?: string;
}

const builtInCssClasses: SectionHeaderCssClasses = {
  sectionHeaderContainer: "flex items-center w-full pl-1 bg-green-2 p-3 mb-4",
  sectionHeaderIconContainer: "w-5 h-5",
  sectionHeaderLabel: "font-bold text-white text-xl uppercase pl-3",
  viewMoreContainer:
    "flex justify-end flex-grow ml-auto font-medium text-gray-800",
  viewMoreLink: "text-white pr-1 pl-3",
  appliedFiltersContainer: "ml-3 flex flex-wrap",
  nlpFilter:
    "border rounded-3xl px-3 py-1.5 text-sm font-medium italic text-gray-800 mr-2",
  removableFilter:
    "flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2",
};

interface SectionHeaderConfig {
  label: string;
  results: any;
  appliedFiltersConfig?: AppliedFiltersProps;
  customCssClasses?: SectionHeaderCssClasses;
  verticalKey: string;
  viewAllButton?: boolean;
}

export default function SectionHeader(props: SectionHeaderConfig): JSX.Element {
  const { label, customCssClasses, results } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const entityTypes = results[0].entityType;
  console.log(entityTypes,'entityTypes')
  cssClasses.appliedFiltersContainer = classNames(
    cssClasses.appliedFiltersContainer,
    {
      [cssClasses.appliedFiltersContainer ?? ""]: isLoading,
    }
  );
  let headImage;
  if (entityTypes == "location") {
    headImage = map_marker;
  }
  if (entityTypes == "faq") {
    headImage = faqImage;
  }
 
  return (
    <div className={cssClasses.sectionHeaderContainer}>
      <div className={cssClasses.sectionHeaderIconContainer}></div>
      <img src={headImage} alt="" />
      <h2 className={cssClasses.sectionHeaderLabel}>{label}</h2>
    </div>
  );
}
