import { getProjectLesson } from "@/actions/admin.action";
import { Separator } from "@/components/ui/separator";
import { CourseType } from "@/types/app.types";
import { Plus } from "lucide-react";
import CreateLessonModal from "./create-lesson.modal";
import LessonList from "./lesson-list";

interface Props {
  courseData: CourseType;
}

const Lessons = async ({ courseData }: Props) => {
  const { data } = await getProjectLesson(courseData._id);

  return (
    <div className="bg-sidebar p-6 rounded-md border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-space-grotesk">Lessons</h2>
        <CreateLessonModal>
          <span>Add</span>
          <Plus />
        </CreateLessonModal>
      </div>

      <Separator className="my-4" />

      {data.length === 0 && (
        <p className="text-center py-10 text-muted-foreground">
          No sections found.
        </p>
      )}

      <LessonList lessons={data} />
    </div>
  );
};

export default Lessons;
