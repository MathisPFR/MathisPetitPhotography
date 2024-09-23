import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const Faq = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Où puis-je retrouver les photos que j'ai likées ?
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Une fois que vous avez liké une photo, vous pouvez retrouver toutes
            vos photos préférées dans une galerie dédiée.
          </p>
        </AccordionItemPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            Comment puis-je liker une photo sur le site ?
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>Cliquez simplement sur le cœur en bas de la photo.</p>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;
