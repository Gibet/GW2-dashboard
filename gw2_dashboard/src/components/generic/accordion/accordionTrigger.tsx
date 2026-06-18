import {
  useAccordionContext,
  useAccordionItemContext,
} from "../../../contexts/accordionContext";

type AccordionTriggerProps = {
  children: React.ReactNode;
  onClick?: () => void
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children, onClick = () => {}
}) => {
  const context = useAccordionContext();
  const item = useAccordionItemContext();

  const handleClick = () => {
    context?.handleTrigger(item?.id)
    onClick()
  }

  // context can be null
  if (!context || !item) return null;
  return (
    <div>
      <button onClick={handleClick}>
        {children}
      </button>
    </div>
  );
};
