const constant = {
  getCountryName: () => {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage.getItem("country") || "";
    }

    return "";
  },
  getQueryParam: () => {
    if (typeof window !== "undefined") {
      const queryString = window.location.search;
      const parameters = new URLSearchParams(queryString);
      return parameters.get("query") || "";
    }

    return "";
  },
  getQuery: (countries: string[], query = "", country = "") => {
    let newQuery = query;
    let selectedCountry = "";
    countries.forEach((element: string) => {
      if (query.toLowerCase().includes(element.toLowerCase())) {
        selectedCountry = element;
      }
    });

    if (selectedCountry && selectedCountry !== country) {
      newQuery = newQuery.replace(selectedCountry, country);
    } else if (country && !selectedCountry) {
      newQuery = `${newQuery} ${country}`;
    }
    return newQuery;
  },
};
export default constant;
