import { SearchBar } from "@yext/search-ui-react";
import * as React from "react";
import FilterDropDown from "../commons/FilterDropDown";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import constant from "../commons/Functions";
import Model from "../commons/Model";
import ClearButton from "./ClearButton";

interface ChildProps {
 
  universal?: string;
  vertical?: string;
  _site: any;
}

export default function YextSearchBar({
 
  universal,
  vertical,
  _site,
}: ChildProps) {
  const [country, setCountry] = React.useState("");
  const [proceed, setProceed] = React.useState(false);

  
  const searchAction = useSearchActions();
  const searchState = useSearchState((state) => state.query);
  const verticalState = useSearchState((state) => state.vertical);
  const clear = useSearchState((state) => state.query.input?.length)
console.log(clear,'clear')
  function setStaticFilter(countryName: string) {
    if (countryName) {
      const filters: SelectableStaticFilter[] = [
        {
          selected: true,
          filter: {
            fieldId: "c_countryName",
            matcher: Matcher.Equals,
            value: countryName,
            kind: "fieldValue",
          },
        },
        {
          selected: true,
          filter: {
            fieldId: "c_countryName",
            matcher: Matcher.Equals,
            value: countryName.toLowerCase().replaceAll(" ", "-"),
            kind: "fieldValue",
          },
        },
      ];
      console.log("filters :>> ", filters);
      searchAction.setStaticFilters(filters);
    }
  }

  function updateParam(latestUserInput: string) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("query", latestUserInput);
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.replaceState({}, "", newUrl);
  }

  React.useEffect(() => {
    if (proceed && country) {
      const inputValue = searchState.input;

      if (universal === "index") {
        const query = inputValue ? `${inputValue} ${country}` : country;
        searchAction.setQuery(query);
        searchAction.setUniversal();
        searchAction.executeUniversalQuery();
        if (country) {
          searchAction.setQuery(
            query.replace(inputValue ? ` ${country}` : country, "")
          );
        }
      } else {
        searchAction.setQuery(inputValue || "");
        setStaticFilter(country);
        searchAction.executeVerticalQuery();
      }

      setProceed(false);
    }
  }, [proceed]);

  React.useEffect(() => {
    if (vertical) {
      const inputValue = constant.getQueryParam();
      const newCountry = constant.getCountryName();
      setStaticFilter(newCountry);
      searchAction.setQuery(inputValue || "");
      const currentVertical = verticalState.verticalKey;
      if (!currentVertical || currentVertical !== vertical) {
        searchAction.setVertical(vertical || "");
      }
    } else if (universal === "index") {
      const inputValue = constant.getQueryParam();
      const newCountry = constant.getCountryName();
      const query = inputValue ? `${inputValue} ${newCountry}` : newCountry;
      searchAction.setQuery(query);
      searchAction.setUniversal();
      searchAction.executeUniversalQuery();
      if (newCountry) {
        searchAction.setQuery(
          query.replace(inputValue ? ` ${newCountry}` : newCountry, "")
        );
      }
      
    }
  }, [vertical]);
  function clearInput(){
    searchAction.setQuery('')
    searchAction.executeVerticalQuery();
}
   function clearButton(){
     return <ClearButton
    className= 'clear-button'
     handleClick={clearInput}
     isnotclear= {clear}
   />
   }
  return (
    <React.Fragment>
     
      <SearchBar
        placeholder="Search Your Query Here"
        onSearch={(response: { query: string; }) => {
          if (response.query) {
            const country = constant.getCountryName();
            if (universal === "index") {
              const query = `${response.query} ${country}`;
              searchAction.setQuery(query);
              searchAction.setUniversal();
              searchAction.executeUniversalQuery();
              searchAction.setQuery(
                query.replace(response.query ? ` ${country}` : country, "")
              );
              updateParam(
                query.replace(response.query ? ` ${country}` : country, "")
              );
            } else {
              
              const currentVertical = verticalState.verticalKey;
              if (!currentVertical || currentVertical !== vertical) {
                searchAction.setVertical(vertical || "");
              }
              searchAction.executeVerticalQuery();
              updateParam(response.query);
            }
          } else {
            const country = constant.getCountryName();

            if (universal === "index") {
              searchAction.setQuery(`${country}`);
              searchAction.setUniversal();
              searchAction.executeUniversalQuery();
              searchAction.setQuery("");
            } else {
              searchAction.setQuery("");
              setStaticFilter(country);
              const currentVertical = verticalState.verticalKey;
              if (!currentVertical || currentVertical !== vertical) {
                searchAction.setVertical(vertical || "");
              }
              searchAction.executeVerticalQuery();
            }
            if(clear && clear <= 0 ) {
              clearButton
            }

            updateParam("");
          }
        }}
      />

      
    </React.Fragment>
  );
}
