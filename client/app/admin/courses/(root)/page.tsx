import { getCourses } from "@/actions/admin.action";
import { Separator } from "@/components/ui/separator";
import CourseCard from "./_components/course.card";
import CreateCourseModal from "./_components/create-course-modal";
import { CourseType } from "@/types/app.types";
import { Suspense } from "react";

const CoursesPage = async () => {
  const { data } = await getCourses();

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold font-space-grotesk">Courses</h2>

        <Suspense>
          <CreateCourseModal />
        </Suspense>
      </div>
      <Separator className="my-4" />

      <div className="grid grid-cols-3 gap-4">
        {data &&
          data.map((course: CourseType) => (
            <CourseCard key={course._id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default CoursesPage;
