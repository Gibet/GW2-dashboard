import type React from "react";
import type { SpecializationType, TraitType } from "../../utils/types/build";
import { useMemo } from "react";
import Trait from "./trait";
import { chunk } from "../../utils/functions";

type TraitLineProps = {
  specialization: SpecializationType;
  traits: {
    minorTraits: (TraitType | undefined)[];
    majorTraits: (TraitType | undefined)[];
    weaponTrait: TraitType | undefined;
  };
};

const TraitLine: React.FC<TraitLineProps> = ({ specialization, traits }) => {
  const major_traits = useMemo(() => {
    const validMajorTraits = traits.majorTraits.filter(Boolean);
    return chunk(validMajorTraits, 3);
  }, [traits.majorTraits]);

  return (
    <div
      key={specialization.id}
      title={specialization.name}
      className="traitline w-full overflow-hidden grid grid-cols-10"
      style={{
        backgroundImage: `url(${specialization.background})`,
      }}
    >
      <div className="col-span-4 h-full flex justify-center items-center line_icon">
        <span></span>
      </div>
      <span className="weapon_proficiency">
        {specialization.weapon_trait && (
          <Trait trait={traits.weaponTrait} type="minor" />
        )}
      </span>
      {traits?.minorTraits.map((minor, index) => (
        <>
          <div key={minor?.id} className="col-span-1 trait_tier">
            <Trait trait={minor} type="minor" />
          </div>
          <div className="trait_tier col-span-1 gap-1">
            {major_traits[index]?.map((major) => (
              <Trait trait={major} type="major" />
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default TraitLine;
