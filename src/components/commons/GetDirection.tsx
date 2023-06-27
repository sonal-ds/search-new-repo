import * as React from "react";
import { AddressType, Coordinate, Link } from "@yext/pages/components";

export const getDirectionUrl = (
  address: AddressType,
  googlePlaceId = "",
  userLocation: null | Coordinate = null
) => {
  let address_string = "";
  if (address.line1) {
    address_string += address.line1 + ",";
  }
  if (address.line2) {
    address_string += address.line2 + ",";
  }
  if (address.city) {
    address_string += address.city + ",";
  }
  if (address.region) {
    address_string += address.region + ",";
  }
  if (address.postalCode) {
    address_string += address.postalCode + ",";
  }
  address_string += address.countryCode;
  address_string = address_string.replace("undefined,", "");

  let directionUrl =
    `https://www.google.com/maps/dir/?api=1&destination=` +
    encodeURIComponent(address_string);

  if (googlePlaceId) {
    directionUrl += `&destination_place_id=${googlePlaceId}`;
  }

  if (userLocation && userLocation.latitude && userLocation.longitude) {
    directionUrl += `&origin=${userLocation.latitude},${userLocation.longitude}`;
  }
  return directionUrl;
};

const GetDirection = (props: any) => {
  const { buttonText, address } = props;



  return (
    <>
      <Link
        data-ya-track="getdirections"
        eventName={`getdirections`}
        className="btn notHighligh"
        href={getDirectionUrl(address)}
        rel="noopener noreferrer"
        target="_blank"
      >
        {buttonText}
      </Link>
    </>
  );
};

export default GetDirection;
