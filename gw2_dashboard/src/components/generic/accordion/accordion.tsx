import React from "react";
import { AccordionProvider } from "../../../contexts/accordionContext";

export const Accordion: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AccordionProvider>{children}</AccordionProvider>;
};
