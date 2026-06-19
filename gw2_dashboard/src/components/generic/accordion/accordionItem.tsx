import { AccordionItemProvider } from "../../../contexts/accordionContext";

type AccordionItemProps = {
  id: number;
  children: React.ReactNode;
};
export const AccordionItem: React.FC<AccordionItemProps> = ({ children, id }) => {
  return <AccordionItemProvider id={id}>{children}</AccordionItemProvider>;
};
