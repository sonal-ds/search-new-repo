import * as React from "react";


const Address = (props: any) => {
  const { address } = props;
  return (
    <div className="address_1 notHighlight">
      {address.line1 && (
        <div>
          <span className="notHighlight">{address.line1}</span>
        </div>
      )}
      {address.line2 && (
        <div>
          <span className="notHighlight">
            {address.line2 && address.line2}
            {address.city ? "," : ""}
          </span>
        </div>
      )}

      {address.city && (
        <div>
          <span className="notHighlight">
            {address.city === address.region ? "" : address.city}
            {address.region ? "," : ""} {address.region}
            {address.postalCode ? "," : ""}
          </span>
        </div>
      )}

      {address.city && (
        <div>
          <span className="notHighlight">
            {address.postalCode} {address.countryCode ? "," : ""}
           {address.countryCode}
          </span>
        </div>
      )}
    </div>
  );
};

export default Address;
