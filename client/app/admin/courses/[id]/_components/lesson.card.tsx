"use client";

import { deleteLesson } from "@/actions/admin.action";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { LessonType } from "@/types/app.types";
import { Draggable } from "@hello-pangea/dnd";
import { Grip } from "lucide-react";
import { useState } from "react";
import CreateLessonModal from "./create-lesson.modal";

interface Props {
  lesson: LessonType;
  index: number;
}

const LessonCard = ({ lesson, index }: Props) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    const isConfirm = confirm("Are you sure you want to delete this lesson?");
    if (!isConfirm) return;

    setLoading(true);

    try {
      await deleteLesson(lesson._id, lesson.course.toString());
      toast.add({
        type: "success",
        description: "Lesson deleted successfully",
      });
    } catch (error) {
      const result = error as Error;
      toast.add({
        type: "error",
        description: result.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Draggable draggableId={lesson._id} index={index}>
      {(provided) => (
        <div
          className="flex items-center gap-x-2 rounded-md text-sm border-b bg-secondary group relative"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {loading && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center rounded-md z-10 animate-pulse">
              <Spinner />
            </div>
          )}
          <div
            className="rounded-l-md border-r border-r-foreground/30 px-2 py-3 transition-all hover:bg-sidebar cursor-pointer"
            {...provided.dragHandleProps}
          >
            <Grip />
          </div>

          <span>{lesson.title}</span>

          <div className="ml-auto flex items-center gap-x-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <CreateLessonModal lessonId={lesson._id} lessonData={lesson}>
              Edit
            </CreateLessonModal>
            <Button
              size="sm"
              variant="destructive"
              disabled={loading}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default LessonCard;
