import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  TemplateProps,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import {
  SpellCheck,
  ResultsCount,
  Pagination,
  AppliedFilters,
} from "@yext/search-ui-react";
import DirectAnswer from "../components/search/DirectAnswer";
import Navigation from "../components/search/Navigation";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import LocationResults from "../components/LocationResults";
import { LocationProvider } from "../components/LocationContext";
import PageLayout from "../components/PageLayout";

import LocationCard from "../components/cards/LocationCard";
import YextSearchBar from "../components/search/YextSearchBar";
import { favicon } from "../sites-global/global";

export const config: TemplateConfig = {
  stream: {
    $id: "location",
    fields: ["name", "slug"],
    filter: {
      entityIds: ["location-global-data"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};
export const getPath: GetPath<TemplateProps> = () => {
  return "locations";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `${
      document._site.c_faq_meta_title
        ? document._site.c_faq_meta_title
        : `Green Motion FAQ Answer Search.`
    }`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document._site.c_faq_meta_description
              ? document._site.c_faq_meta_description
              : `View Green Motion near you today at Green Motion. We stock high-quality, robust products at competitive rates.`
          }`,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:title",

          content: `${
            document._site.c_faq_meta_title
              ? document._site.c_faq_meta_title
              : `Green Motion FAQ Answer Search.`
          }`,
        },
      },
    ],
  };
};

answersHeadlessConfig.verticalKey = "locations";

const searcher = provideHeadless(answersHeadlessConfig);

const LocationsPage: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;

  return (
    <React.Fragment>
      {/* <PageLayout _site={_site}> */}
        <SearchHeadlessProvider searcher={searcher}>
          <LocationProvider>
            <div className="pb-12">
              <div className="header-bg">
                <div className="mx-auto flex max-w-[90rem] px-5 flex-col search_vertical">
                  <YextSearchBar
                    
                    _site={_site}
                    vertical={"locations"}
                  />
                  <Navigation />
                </div>
              </div>

              <div className="mx-auto flex max-w-[90rem] flex-col bg-white py-0 px-5 mt-6 pb-6 mb-6">
                <ResultsCount
                  customCssClasses={{ resultsCountContainer: "resultcount" }}
                />
                <section>
                  {/* <DirectAnswer /> */}
                  <SpellCheck />
                  {/* <p className="nlpFilter">
                    <AppliedFilters hiddenFields={["builtin.entityType"]} />
                  </p> */}
                  <LocationResults
                    verticalKey="locations"
                    cardConfig={{ CardComponent: LocationCard }}
                  />
                </section>
              </div>
              <Pagination />
            </div>
          </LocationProvider>
        </SearchHeadlessProvider>
      {/* </PageLayout> */}
    </React.Fragment>
  );
};

export default LocationsPage;
