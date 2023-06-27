import { useLayoutEffect } from "react";
import {
  useSearchActions,
  SearchIntent,
  UniversalLimit,
} from "@yext/search-headless-react";
import { universalResultsConfig } from "../config/universalResultsConfig";
import { getUserLocation } from "@yext/search-ui-react";

export async function executeSearch(answersActions: any, isVertical: boolean) {
  isVertical
    ? answersActions.executeVerticalQuery()
    : answersActions.executeUniversalQuery();
}

/**
 * Get search intents of the current query stored in headless using autocomplete request.
 */
export async function getSearchIntents(
  answersActions: any,
  isVertical: boolean
) {
  const results = isVertical
    ? await answersActions.executeVerticalAutocomplete()
    : await answersActions.executeUniversalAutocomplete();
  return results?.inputIntents;
}

/**
 * If the provided search intents include a 'NEAR_ME' intent and there's no existing
 * user's location in state, retrieve and store user's location in headless state.
 */
export async function updateLocationIfNeeded(
  answersActions: any,
  intents: SearchIntent[],
  geolocationOptions?: PositionOptions
) {
  if (
    intents.includes(SearchIntent.NearMe) &&
    !answersActions.state.location.userLocation
  ) {
    try {
      const position = await getUserLocation(geolocationOptions);
      answersActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * Sets up the state for a page
 * @param verticalKey - The verticalKey associated with the page, or undefined for universal pages
 */
export default function usePageSetupEffect(verticalKey?: string, limit?: any) {
  const answersActions = useSearchActions();
  const searchActions = useSearchActions();

  useLayoutEffect(() => {
    const stateToClear = {
      filters: {},
      universal: {},
      vertical: {},
    };
    const key: any = verticalKey;
    const universalverticalkey: any = [
      "faqs",
      "terms_and_conditions",
      "locations",
    ];
    answersActions.setState({
      ...answersActions.state,
      ...stateToClear,
    });
    if (verticalKey) {
      answersActions.setVertical(verticalKey);
    } else {
      answersActions.setUniversal();

      const universalLimit: any = {};
      universalverticalkey.map((res: any) => {
        return (universalLimit[res] = universalResultsConfig || null);
      });

      const newuniversallimit: UniversalLimit = universalLimit;
      searchActions.setUniversalLimit(newuniversallimit);
    }

    if (verticalKey == key) {
      searchActions.setVerticalLimit(limit);
    }

    const executeQuery = async () => {
      let searchIntents: SearchIntent[] = [];
      if (!answersActions.state.location.userLocation) {
        searchIntents =
          (await getSearchIntents(answersActions, !!verticalKey)) || [];
        await updateLocationIfNeeded(answersActions, searchIntents);
      }
      executeSearch(answersActions, !!verticalKey);
    };
    executeQuery();
  }, [answersActions, verticalKey]);
}
