"use client";

import { updateLesson } from "@/actions/admin.action";
import { toast } from "@/components/ui/toast";
import { LessonType } from "@/types/app.types";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import LessonCard from "./lesson.card";

interface Props {
  lessons: LessonType[];
}

const LessonList = ({ lessons }: Props) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lessons || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedLessons = items.slice(startIndex, endIndex + 1);

    const data = updatedLessons.map((lesson) => ({
      _id: lesson._id,
      position: items.findIndex((i) => i._id === lesson._id),
      title: lesson.title,
    }));

    const promise = Promise.all(
      data.map((s) => updateLesson(s._id, { position: s.position })),
    );
    toast.promise(promise, {
      loading: "Updating lessons...",
      success: "Lessons updated successfully",
      error: "Failed to update lessons",
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lessons">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-1"
          >
            {lessons.map((lesson, idx) => (
              <LessonCard key={lesson._id} lesson={lesson} index={idx} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LessonList;
