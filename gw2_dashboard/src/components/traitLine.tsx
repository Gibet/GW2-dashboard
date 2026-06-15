import type React from "react";
import type { SpecializationType, TraitType } from "../utils/types/build";
import { useMemo } from "react";
import Trait from "./trait";

type TraitLineProps = {
  specialization: SpecializationType;
  traits: {
    minorTraits: TraitType[];
    majorTraits: TraitType[];
  }
};

const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const TraitLine: React.FC<TraitLineProps> = ({ specialization, traits }) => {

  const major_traits = useMemo(() => {
    const validMajorTraits = traits.majorTraits.filter(Boolean);
    return chunk(validMajorTraits, 3);
  }, [traits.majorTraits])

  return (
    <div key={specialization.id} title={specialization.name}
      className="traitline w-full overflow-hidden grid grid-cols-10"
      style={{
        backgroundImage: `url(${specialization.background})`,
      }}
    >
      <div className="col-span-4 h-full flex justify-center items-center line_icon">
        <span className="h-11/12 w-1/2"></span>
      </div>
        {traits?.minorTraits.map((minor, index) => (<>
          <div key={minor?.id} className="col-span-1 trait_tier">
            <Trait trait={minor} type="minor" />
          </div>
          <div className="trait_tier col-span-1 gap-0.5">
            {major_traits[index]?.map((major) => (
              <Trait trait={major} type="major" />
            ))}
          </div>
        </>))}
    </div>
  );
};

export default TraitLine;
