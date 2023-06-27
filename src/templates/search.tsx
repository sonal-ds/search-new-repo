import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import PageLayout from "../components/PageLayout";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import { LocationBias, Pagination, SpellCheck } from "@yext/search-ui-react";
import Navigation from "../components/search/Navigation";
import UniversalResults from "../components/search/UniversalResults";
import { universalResultsConfig } from "../config/universalResultsConfig";

import YextSearchBar from "../components/search/YextSearchBar";
import { favicon } from "../sites-global/global";
import DirectAnswer from "../components/search/DirectAnswer";

const universalResultsFilterConfig = {
  show: false,
};

export const config: TemplateConfig = {
  stream: {
    $id: "search",
    fields: ["name", "slug"],
    filter: {
      entityIds: ["global-data"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return "index.html";
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
const searcher = provideHeadless(answersHeadlessConfig);

const Search: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;
  return (
    <>
      {/* <PageLayout _site={_site}> */}
        <SearchHeadlessProvider searcher={searcher}>
          <div className="pb-12">
            <div className="header-bg">
              <div className="mx-auto flex max-w-[90rem] px-5 flex-col search_vertical">
                <YextSearchBar
                 
                  universal="index"
                  _site={_site}
                />
                <Navigation />
              </div>
            </div>
            <div className="mx-auto flex max-w-[90rem] flex-col bg-white py-0 px-5 mt-6 pb-6">
              <SpellCheck />
              {/* <DirectAnswer /> */}
              <UniversalResults
                appliedFiltersConfig={universalResultsFilterConfig}
                verticalConfigs={universalResultsConfig}
              />
            </div>
            <Pagination />
          </div>
          <LocationBias/>
        </SearchHeadlessProvider>
      {/* </PageLayout> */}
    </>
  );
};

export default Search;
