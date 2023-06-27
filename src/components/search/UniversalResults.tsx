import * as React from "react";
import { useSearchState, VerticalResults } from "@yext/search-headless-react";
import StandardSection from "../../sections/StandardSection";
import SectionHeader from "../../sections/SectionHeader";
import classNames from "classnames";
import {
  AppliedFiltersProps,
  SectionComponent,
  useComposedCssClasses,
} from "@yext/search-ui-react";
import {CompositionMethod } from "../interface/interface";
import {CardConfig} from "../../models/cardComponent"

interface UniversalResultsCssClasses {
  container?: string;
  results___loading?: string;
}

const builtInCssClasses: UniversalResultsCssClasses = {
  container: "space-y-8 mt-6",
  results___loading: "opacity-50",
};

export interface VerticalConfig {
  SectionComponent?: SectionComponent;
  cardConfig?: CardConfig;
  label?: string;
  viewAllButton?: boolean;
}

interface AppliedFiltersConfig
  extends Omit<AppliedFiltersProps, "appliedQueryFilters"> {
  show: boolean;
}

interface UniversalResultsProps {
  appliedFiltersConfig?: AppliedFiltersConfig;
  verticalConfigs: Record<string, VerticalConfig>;
  customCssClasses?: UniversalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

/**
 * A component that displays all the vertical results of a universal search.
 */
export default function UniversalResults({
  verticalConfigs,
  appliedFiltersConfig,
  customCssClasses,
}: UniversalResultsProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const resultsFromAllVerticals =
    useSearchState((state) => state?.universal?.verticals) || [];
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const latestQuery = useSearchState((state) => state.query.input) || "";
  const resultsClassNames = classNames(cssClasses.container, {
    [cssClasses.results___loading ?? ""]: isLoading,
  });
  
  return  typeof sessionStorage == "undefined" && 
  resultsFromAllVerticals &&
    resultsFromAllVerticals.length === 0 ? (
   
     <div className="mb-6 pb-6 mt-6 pt-6">
       <p className="text-2xl font-bold">No results found</p>
       { console.log("np")}
     </div>
  ) : (
    <div className={resultsClassNames}>
      {renderVerticalSections({
        resultsFromAllVerticals,
        appliedFiltersConfig,
        verticalConfigs,
        latestQuery,
      })}
    </div>
  );
}

interface VerticalSectionsProps extends UniversalResultsProps {
  resultsFromAllVerticals: VerticalResults[];
  latestQuery: string;
}

/**
 * Renders a list of SectionComponent based on the given list of vertical results and corresponding configs,
 * including specifing what section template to use.
 */
function renderVerticalSections(props: VerticalSectionsProps): JSX.Element {
  const { resultsFromAllVerticals, verticalConfigs, latestQuery } = props;

  const sortedResultFromAllVerticals = [];
  const locationResults = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "locations");
  const faqResults = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "faqs");
 
  if (locationResults) {
    sortedResultFromAllVerticals.push(locationResults);
  }
  if (faqResults) {
    sortedResultFromAllVerticals.push(faqResults);
  }
  return (
    <>
      {sortedResultFromAllVerticals.map((verticalResults) => {
        const verticalKey = verticalResults.verticalKey;
        const verticalConfig = verticalConfigs[verticalKey] || {};

        const label = verticalConfig.label ?? verticalKey;
        const results = verticalResults.results;

        const SectionComponent =
          verticalConfig.SectionComponent || StandardSection;

        const { show, ...filterconfig } = props.appliedFiltersConfig || {};
        const appliedFiltersConfig = show
          ? {
              ...filterconfig,
              appliedQueryFilters: verticalResults.appliedQueryFilters,
            }
          : undefined;

        const resultsCountConfig = {
          resultsCount: verticalResults.resultsCount,
          resultsLength: results.length,
        };

        return (
          <>
            <SectionComponent
              results={results}
              verticalKey={verticalKey}
              header={
                <SectionHeader
                  {...{
                    label,
                    resultsCountConfig,
                    appliedFiltersConfig,
                    verticalKey,
                    results,
                    viewAllButton: verticalConfig.viewAllButton,
                  }}
                />
              }
              cardConfig={verticalConfig.cardConfig}
              key={verticalKey}
            />
            <a
              className="bottom_link"
              href={`/${verticalKey}${
                latestQuery ? `?query=${latestQuery}` : ""
              }`}
            >
              View all
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9134 5.31371L5.72793 10.4992L4.78512 9.55635L9.02776 5.31371L4.78512 1.07107L5.72793 0.128259L10.9134 5.31371ZM6.19934 5.31371L1.01389 10.4992L0.0710796 9.55635L4.31372 5.31371L0.0710788 1.07107L1.01389 0.12826L6.19934 5.31371Z"
                  fill="#586249"
                />
              </svg>
            </a>
          </>
        );
      })}
    </>
  );
}
