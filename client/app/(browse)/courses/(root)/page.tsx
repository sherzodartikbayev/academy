import CourseCard from "@/components/cards/course.card";
import { courses } from "@/constants";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <>
      <h1 className="text-2xl font-space-grotesk font-semibold">Courses</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {courses.map((course) => (
          <Link href={`/courses/${course.slug}`} key={course.slug}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default CoursesPage;
