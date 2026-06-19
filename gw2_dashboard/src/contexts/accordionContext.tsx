import React, { createContext, useContext, useMemo, useState } from "react";

type AccordionContextValue = {
  activeContent?: number
  handleTrigger: (id?: number) => void
};

type AccordionItemContextValue = {
  id?: number
};

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);
export const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined);

export const AccordionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [activeContent, setActiveContent] = useState<number | undefined>();
  const handleTrigger = (id: number | undefined) => {
    let activeId: number | undefined = id;
    if (activeId === activeContent) activeId = undefined;
    setActiveContent(activeId);
  };
  const value = useMemo(() => ({ activeContent, handleTrigger }), [
    activeContent,
    handleTrigger,
  ]);
  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};

export const AccordionItemProvider: React.FC<{children: React.ReactNode, id: number}> = ({
  id,
  children,
}) => {
  const value = useMemo(() => ({ id }), [id]);
  return (
    <AccordionItemContext.Provider value={value}>
      {children}
    </AccordionItemContext.Provider>
  );
};

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error("useAccordion must be used within a <Accordion />");
  }
  return context;
};

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (context === undefined) {
    throw new Error(
      "useAccordionItemContext must be used within <AccordionItem />",
    );
  }
  return context;
};
