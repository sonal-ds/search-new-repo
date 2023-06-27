import * as React from "react";
import { CardConfigTypes, CompositionMethod } from "../interface/interface";
import { useSearchState, Result } from "@yext/search-headless-react";
import { CardComponent } from "@yext/search-ui-react";

interface VerticalResultsCssClasses {
  results___loading?: string;
}

interface VerticalResultsDisplayProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;
  isLoading?: boolean;
  results: Result[];
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

/**
 * A Component that displays all the search results for a given vertical.
 *
 * @param props - The props for the Component, including the results and the card type
 *                to be used.
 */
export function VerticalResultsDisplay(
  props: VerticalResultsDisplayProps
): JSX.Element | null {
  const { CardComponent, results } = props;
  const entityTypes =
    results && results.length > 0 ? results[0].entityType : "";

  if (!results || results.length === 0) {
    return null;
  } else {
    return (
      <div className={entityTypes + " grid-product"}>
        {results &&
          results.map((result) => renderResult(CardComponent, result))}
      </div>
    );
  }
}

/**
 * Renders a single result using the specified card type and configuration.
 *
 * @param CardComponent - The card for the vertical.
 * @param cardConfig - Any card-specific configuration.
 * @param result - The result to render.
 */
function renderResult(
  CardComponent: CardComponent,
  result: Result
): JSX.Element {
  return <CardComponent result={result} key={result.id || result.index} />;
}

interface VerticalResultsProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;
  displayAllOnNoResults?: boolean;
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
  allowPagination?: boolean;
}

export default function VerticalResults(
  props: VerticalResultsProps
): JSX.Element | null {
  const {
    displayAllOnNoResults = true,
    allowPagination = true,
    ...otherProps
  } = props;

  const verticalResults =
    useSearchState((state) => state.vertical.results) || [];
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const query = useSearchState((state) => state.query.input);
  const aleternateVerticals = useSearchState(
    (state) => state.vertical.noResults?.alternativeVerticals
  );
  const filterVariable =
    aleternateVerticals?.filter(
      (filtredResulta) => filtredResulta.resultsCount > 0
    ) || [];
  const filterVariableLength = filterVariable.length;
  const returnedAlternateVerticals = filterVariable.map((res: any) => {
    const verticalName = res.verticalKey.toUpperCase();
    const verticalSlug = res.verticalKey;
    const list: { [index: string]: string } = {
      TERMS_AND_CONDITIONS: "Terms and Conditions",
      FAQS: "FAQ's",
      LOCATIONS: "LOCATIONS",
    };

    return (
      <a
        href={`/${verticalSlug}${query ? `?${query}` : ""}`}
        className="text-2xl font-semibold result-verticalcta"
        key={verticalName}
      >
        {list[verticalName]}
      </a>
    );
  });

  const results = verticalResults;

  return (
    <>
      {results.length === 0 && isLoading === false ? (
        <div className="alternateVerticals !block w-full">
          {filterVariableLength > 0 ? (
            <p className="text-xl font-bold result-vertical">
              <span>
                No result found in this vertical... Showing verticals related to
                this query
              </span>
              <br></br>
              {returnedAlternateVerticals}
            </p>
          ) : (
            <p className="result-vertical">
              OOps ! ..No results found in any vertical for this query.
            </p>
          )}
        </div>
      ) : (
        <VerticalResultsDisplay
          results={results}
          isLoading={isLoading}
          {...otherProps}
        />
      )}
    </>
  );
}
