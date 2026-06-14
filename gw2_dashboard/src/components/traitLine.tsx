import type React from "react";
import type { SpecializationType } from "../utils/types/build";

type TraitLineProps = {
  specialization: SpecializationType;
};

const TraitLine: React.FC<TraitLineProps> = ({ specialization }) => {
  return (
    <div
      className="traitline w-full overflow-hidden grid grid-cols-9"
      style={{
        backgroundImage: `url(${specialization.background})`,
      }}
    >
      <div className="col-span-3 h-full flex justify-center items-center line_icon">
        <span className="h-11/12 w-7/12"></span>
      </div>
      {specialization.minor_traits.map((major, index) => (<>
        <div className="col-span-1 trait_tier">
          <div className="trait border"></div>
        </div>
        <div className="trait_tier col-span-1 gap-0.5">
          <div className="trait border"></div>
          <div className="trait border"></div>
          <div className="trait border"></div>
        </div>
      </>))}
    </div>
  );
};

export default TraitLine;
