import classNames from "classnames";
import { useContext, useEffect, useRef } from "react";
import { LocationContext } from "./LocationContext";
import { LocationActionTypes } from "./locationReducers";
import { VerticalResultsDisplay } from "./search/VerticalResults";
import { GoogleMaps } from "./map/MapGoogle";
import * as React from "react";
import { Result, useSearchState } from "@yext/search-headless-react";
import { googleApikey } from "../sites-global/global";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import { Wrapper } from "@googlemaps/react-wrapper";
import { MapLocationData } from "./interface/interface";

type props = {
  results?: Result[];
  cardConfig?: any;
  verticalKey: string;
};
export default function LocationResults(data: props) {
  const { state, dispatch } = useContext(LocationContext);
  const entityResults = data.results
    ? data.results
    : useSearchState((state) => state.vertical.results);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const screenSize = "xl";
  const { cardConfig } = data;
  const cardComponent = cardConfig?.CardComponent;
  /**
   * Code for Alternate Vertical - Starts
   */
  const aleternateVerticals = useSearchState(
    (state) => state.vertical.noResults?.alternativeVerticals
  );
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const query = useSearchState((state) => state.query.input);
  const filterVariable =
    aleternateVerticals?.filter(
      (filtredResulta) => filtredResulta.resultsCount > 0
    ) || [];
  const filterVariableLength = filterVariable.length;
  const returnedAlternateVerticals =
    filterVariableLength > 0 && isLoading === false ? (
      filterVariable.map((res: any) => {
        const verticalName = res.verticalKey.toUpperCase();
        const verticalSlug = res.verticalKey;

        const list: { [index: string]: string } = {
          TERMS_AND_CONDITIONS: "Terms and Conditions",
          FAQS: "FAQ's",
          LOCATIONS: "LOCATIONS",
        };
        return (
          <>
            <a
              href={`/${verticalSlug}${query ? `?${query}` : ""}`}
              className="text-2xl  font-semibold result-verticalcta"
            >
              {list[verticalName]}
            </a>
          </>
        );
      })
    ) : (
      <>
      {isLoading === false ? <p className="result-vertical">
        OOps ! ..No results found in any vertical for this query.
      </p> : null}
      </>
    );

  /**
   * Code for Alternate Vertical - Ends
   */
  const refLcation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mapLocations: MapLocationData[] = [];

    if (entityResults !== undefined) {
      for (let result = 0; result < entityResults?.length; result++) {
        const enities = entityResults[result];

        const location = enities.rawData as unknown as MapLocationData;
        if (enities.id && location.yextDisplayCoordinate) {
          mapLocations.push({
            id: enities.id ?? "",
            name: location.name,
            address: location.address,
            slug: location.slug,
            yextDisplayCoordinate: {
              latitude: location.yextDisplayCoordinate.latitude,
              longitude: location.yextDisplayCoordinate.longitude,
            },
            emails: location.emails,
            timezone: location.timezone,
            distance: enities.distance,
            c_phoneNumberList: location.c_phoneNumberList,
          });
        }
      }

      dispatch({
        type: LocationActionTypes.SetMapLocations,
        payload: { mapLocations },
      });
    }
  }, [entityResults]);

  const googleMapsConfig = {
    centerLatitude: 26.8894208,
    centerLongitude: 75.8349824,
    googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18",
  };
  return (
    <div className="locator-wrapper ">
      {state.mapLocations &&
        state.mapLocations.length > 0 &&
        isLoading === false && (
          <Wrapper
            apiKey={googleApikey}
            language={answersHeadlessConfig.locale}
            libraries={["places", "geometry"]}
          >
            <div
              className={classNames("w-full map-box", {
                hidden: screenSize !== "xl" && !state.showMap,
              })}
            >
              <GoogleMaps
                apiKey={googleApikey}
                centerLatitude={googleMapsConfig.centerLatitude}
                centerLongitude={googleMapsConfig.centerLongitude}
                check={true}
                defaultZoom={6}
                activeIndex={activeIndex}
                setActiveIndex={(i: React.SetStateAction<number | null>) =>
                  setActiveIndex(i)
                }
                showEmptyMap={true}
                mobile={undefined}
                setMobile={undefined}
              />
            </div>
          </Wrapper>
        )}
      <div
        ref={refLcation}
        className={classNames("overflow-auto location-box", {
          hidden: state.showMap,
          "w-full": !state.showMap,
        })}
      >
        {state.mapLocations &&
        state.mapLocations.length > 0 &&
        isLoading === false ? (
          <VerticalResultsDisplay
            results={entityResults}
            CardComponent={cardComponent}
            {...(cardConfig && { cardConfig })}
            customCssClasses={{ container: "px-4 sm:px-0" }}
          />
        ) : state.noResultMessage ? (
          <div className="flex h-full items-center justify-center">
            <span className="font-heading text-xl">
              {state.noResultMessage}
            </span>
          </div>
        ) : (
          <>
            {filterVariableLength > 0 && (
              <p className="text-xl font-bold result-vertical">
                No result found in this vertical... Showing verticals related to
                this query
              </p>
            )}
            {returnedAlternateVerticals}
          </>
        )}
      </div>
    </div>
  );
}
