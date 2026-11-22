"use client";

import { SectionType } from "@/types/app.types";
import SectionCard from "./section.card";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { updateSection } from "@/actions/admin.action";
import { toast } from "@/components/ui/toast";

interface Props {
  sections: SectionType[];
}

const SectionList = ({ sections }: Props) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSections = items.slice(startIndex, endIndex + 1);

    const data = updatedSections.map((section) => ({
      _id: section._id,
      position: items.findIndex((i) => i._id === section._id),
      title: section.title,
    }));

    const promise = Promise.all(
      data.map((s) => updateSection(s._id, { position: s.position })),
    );
    toast.promise(promise, {
      loading: "Updating sections...",
      success: "Sections updated successfully",
      error: "Failed to update sections",
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-1"
          >
            {sections.map((section, idx) => (
              <SectionCard key={section._id} section={section} index={idx} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
