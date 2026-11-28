import { getCourses } from "@/actions/admin.action";
import CourseCard from "@/components/cards/course.card";
import { CourseType } from "@/types/app.types";
import Link from "next/link";

const CoursesPage = async () => {
  const { data } = await getCourses("course");

  return (
    <>
      <h1 className="text-2xl font-space-grotesk font-semibold">Courses</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {data &&
          data.map((course: CourseType) => (
            <Link href={`/courses/${course.slug}`} key={course.slug}>
              <CourseCard course={course} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default CoursesPage;
