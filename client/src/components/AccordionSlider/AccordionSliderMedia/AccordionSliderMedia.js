import "./AccordionSliderMedia.scss";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import DonateForm from "../../Donate/DonateForm/DonateForm";
import HelpUs from "../../HelpUs/HelpUs";

const items = [
  {
    header: "Одноразово",
    content: (
      <DonateForm
        title="Нагодуйте котів вже сьогодні - ваша допомога важлива"
        optionIdPrefix="media-onetime"
      />
    ),
  },
  {
    header: "Щомісячно",
    content: (
      <DonateForm
        title="Ваша  підтримка змінить життя одного кота!"
        optionIdPrefix="media-monthly"
      />
    ),
  },
  {
    header: "Кормом, ліками, іграшками",
    content: <HelpUs />,
  },
];

const AccordionSliderMedia = () => {
  return (
    <Accordion>
      {items.map(({ header, content }, i) => (
        <AccordionItem header={header} key={i}>
          {content}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionSliderMedia;
