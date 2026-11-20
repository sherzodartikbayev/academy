"use client";

import { SectionType } from "@/types/app.types";
import SectionCard from "./section.card";

interface Props {
  sections: SectionType[];
}

const SectionList = ({ sections }: Props) => {
  return (
    <div className="">
      <div className="space-y-1">
        {sections.map((section, idx) => (
          <SectionCard key={section._id} section={section} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default SectionList;
