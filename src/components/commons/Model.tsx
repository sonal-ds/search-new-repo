import * as React from "react";
import Modal from "react-modal";
import FilterDropDown from "./FilterDropDown";



interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  countryData: string[];
  universal?: string;
  country: string;
  setCountry: (value: string) => void;
  setProceed: (value: boolean) => void;
}

const Model: React.FC<PopupProps> = ({
  countryData,
  country,
  setCountry,
  setProceed,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const sessionData = sessionStorage.getItem("popup_visibility");
      setIsOpen(sessionData === "hidden" ? false : true);
    }
  }, []);

  const handleClosePopup = () => {
    if (typeof sessionStorage !== "undefined") {
      setIsOpen(false);
      sessionStorage.setItem("popup_visibility", "hidden");
      if (country) {
        setProceed(true);
      }
    }
  };

  return isOpen ? (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClosePopup}
      contentLabel="Popup"
      shouldCloseOnOverlayClick={false}
    >
      <FilterDropDown
        c_countryList={countryData}
        conditionHeading="Show"
        setCountry={(value) => setCountry(value)}
        country={country}
      />
      <div className="text-center">
        <button onClick={handleClosePopup} disabled={!country}>Proceed</button>
      </div>
    </Modal>
  ) : null;
};

export default Model;
