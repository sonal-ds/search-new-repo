import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import RtfConverter from "@yext/rtf-converter";
import { Ce_termsAndConditions } from "../../types/terms_and_conditions";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

interface IconProps {
  id: number;
  open: number;
}

const Icon: React.FC<IconProps> = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

const TermsAndConditionsCard: CardComponent<Ce_termsAndConditions> = ({
  result,
}: CardProps<Ce_termsAndConditions>): JSX.Element => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };
  const Articles = result.rawData;
  const id = result.id;
  const articlesHeading = Articles.name;
  const articlesBody = Articles.c_tandcDescription;
  console.log(typeof articlesBody, "Type");
  const termsAndConditionsMarkdown = Articles.c_markdown.markdown;
  const termClass =
    open === 1 ? "faq-block " + id + " active" : "faq-block " + id;

  return (
    <div className={termClass}>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)} className="FaqQuestion">
          <div className="faq-tab py-0 mt-2"> {articlesHeading} </div>
        </AccordionHeader>
        <AccordionBody
          dangerouslySetInnerHTML={{ __html: termsAndConditionsMarkdown }}
        />
      </Accordion>
    </div>
  );
};

export default TermsAndConditionsCard;
