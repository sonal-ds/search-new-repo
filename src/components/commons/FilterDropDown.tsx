import * as React from "react";
import { siteLogo } from "../../sites-global/global";

interface ChildProps {
  c_countryList: string[];
  conditionHeading?: string;
  setCountry: (value: string) => void;
  country: string;
}

const FilterDropDown: React.FC<ChildProps> = ({
  c_countryList,
  conditionHeading,
  setCountry,
  country,
}) => {
  return (
    <div className="">
      <div className="p-8 ask_section">
        <div className="ask_1">
          <div>
            {conditionHeading && conditionHeading === "Show" ? (
              <>
                <a
                  href="https://greenmotion.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={siteLogo} alt="Site Logo" />
                </a>
                <h1 className="flex justify-center">Choose Your Country</h1>
              </>
            ) : (
              <h1 className="flex justify-center">Ask Your Query</h1>
            )}
          </div>
        </div>
        <div className="serarch_1 search_modal">
          <select
            value={country}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCountry(e.target.value);
              if (typeof sessionStorage !== "undefined") {
                sessionStorage.setItem("country", e.target.value);
              }
            }}
          >
            {!country && <option> Please Select The Country</option>}
            {c_countryList?.map((item: string, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterDropDown;
