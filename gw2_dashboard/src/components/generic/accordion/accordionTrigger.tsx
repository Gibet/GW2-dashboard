import {
  useAccordionContext,
  useAccordionItemContext,
} from "../../../contexts/accordionContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import CustomButton from "../button";

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
    <div className="w-full">
      <CustomButton active={context.activeContent === item.id} onClick={handleClick} className="flex w-full text-left justify-between">
        {children}
        <span>
          {context.activeContent === item.id ? (<span><ChevronUp /></span>) :
            (<span><ChevronDown /></span>)
          }
        </span>
      </CustomButton>
    </div>
  );
};
