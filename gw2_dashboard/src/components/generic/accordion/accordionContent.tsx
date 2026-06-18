import {
  useAccordionContext,
  useAccordionItemContext,
} from "../../../contexts/accordionContext";

export const AccordionContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const context = useAccordionContext();
  const item = useAccordionItemContext();

  return (
    <>{context?.activeContent === item?.id ? <div>{children}</div> : null}</>
  );
};
