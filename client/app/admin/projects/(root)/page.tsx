import { getCourses } from "@/actions/admin.action";
import { CourseType } from "@/types/app.types";
import Link from "next/link";
import CreateProjectModal from "./_components/create-project-modal";
import ProjectCard from "./_components/project.card";

const Page = async () => {
  const { data } = await getCourses("project");

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-space-grotesk font-semibold">Projects</h1>
        <CreateProjectModal />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {data &&
          data.map((course: CourseType) => (
            <Link href={`/projects/${course.slug}`} key={course.slug}>
              <ProjectCard course={course} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Page;
