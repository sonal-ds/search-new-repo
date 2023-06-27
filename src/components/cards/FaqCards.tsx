import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import { Faq } from "../../types/faqs";
import RtfConverter from "@yext/rtf-converter";
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
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

const FaqCard: CardComponent<Faq> = ({
  result,
}: CardProps<Faq>): JSX.Element => {
  const [open, setOpen] = React.useState<number | null>(null); // Updated: Use null instead of 0

  const handleOpen = (value: number) => {
    setOpen(prevOpen => (prevOpen === value ? null : value)); // Updated: Use null instead of 0
  };

  const Faq = result.rawData;
  const id = result.id;
  const question = Faq.question;
  const answer = Faq.answer;
  const description = RtfConverter.toHTML(answer);
  const faqClass = open === id ? "faq-block " + id + " active" : "faq-block " + id;

  return (
    <div className={faqClass}>
      <Accordion open={open === id} icon={<Icon id={id} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(id)} className="FaqQuestion">
          <div className="faq-tab py-0 mt-2">{question}</div>
        </AccordionHeader>
        <AccordionBody dangerouslySetInnerHTML={{ __html: description }} />
      </Accordion>
    </div>
  );
};

export default FaqCard;
