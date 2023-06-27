import { Result } from "@yext/search-headless-react";
import { CardComponent, ResultsCountCssClasses } from "@yext/search-ui-react";
import { LocationData } from "../../types/locations";



export interface DisplayableFilter {
    filterType: 'NLP_FILTER' | 'STATIC_FILTER' | 'FACET',
    filter: any,
    groupLabel: string,
    label: string
}

export interface cardConfig {
    CardComponent?: any;
    showOrdinal: boolean,
}

export interface SectionConfig {
    results: Result[],
    verticalKey: string,
    header?: JSX.Element,
    cardConfig?: cardConfig,
    viewMore?: boolean
  }
  
  export interface StandardCardConfig {
    showOrdinal?: boolean
  }

  export type CardConfigTypes = StandardCardConfig;

  export interface CardConfig extends CardConfigTypes {
    CardComponent: CardComponent
  }

  export interface MapLocationData extends LocationData {
    timezone: any;
    c_phoneNumberList: any;
    emails: any;
    slug: any;
    yextDisplayCoordinate?: {
      latitude: number,
      longitude: number
    }
  }


  export interface ResultsCountConfig {
    resultsCount?: number;
    resultsLength?: number;
    offset?: number;
    customCssClasses?: ResultsCountCssClasses;
  }

  export type CompositionMethod = "merge" | "replace" | "assign";