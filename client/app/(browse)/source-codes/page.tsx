import CourseCard from "@/components/cards/course.card";
import { courses } from "@/constants";

const SourceCodesPage = () => {
  return (
    <>
      <h1 className="text-2xl font-space-grotesk font-semibold">
        Source Codes
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {courses.map((course) => (
          <CourseCard course={course} key={course.slug} />
        ))}
      </div>
    </>
  );
};

export default SourceCodesPage;
