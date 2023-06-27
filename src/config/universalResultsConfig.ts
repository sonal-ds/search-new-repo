import { VerticalConfig } from "../components/search/UniversalResults";
import LocationSection from "../sections/LocationSection";
import FaqCard from "../components/cards/FaqCards";
import TermsAndConditionsCard from "../components/cards/TermsAndConditionsCard";
import LocationCard from "../components/cards/LocationCard";


export type UniversalResultsConfig = Record<string, VerticalConfig>;
export const universallimit = 3;
export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    SectionComponent: LocationSection,
    label: "Locations",
    viewAllButton: true,
    cardConfig: {
      CardComponent: LocationCard,
      showOrdinal: false,
    },
  },
  faqs: {
    label: "FAQs",
    viewAllButton: true,
    cardConfig: {
      CardComponent: FaqCard,
      showOrdinal: false,
    },
  },
};
