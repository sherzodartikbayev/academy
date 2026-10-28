import CourseCard from "@/components/cards/course.card";
import SourceCodeCard from "@/components/cards/source-code.card";
import { Button } from "@/components/ui/button";
import { courses, projects, source_codes } from "@/constants";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-x-4 items-center border rounded-lg p-8 max-lg:p-4 bg-secondary bg-linear-to-br from sidebar to-primary/40">
        <div className="col-span-3 max-md:col-span-5">
          <h1 className="text-3xl font-space-grotesk font-semibold">
            Welcome to <span className="text-primary">Academy</span>
          </h1>
          <p className="text-muted-foreground leading-5 text-sm">
            Academy - teach you how to code, one step at time. Learn code with
            interactive lessons, coding challanges, and real-world projects.
            Start your coding journey today!
          </p>

          <div className="flex gap-4 mt-4">
            <Button
              className="rounded-full px-6"
              size="lg"
              render={<Link href="/courses">Explore courses</Link>}
            ></Button>
            <Button
              className="rounded-full px-6"
              size="lg"
              variant="secondary"
              render={<Link href="/projects"></Link>}
            >
              View projects
            </Button>
          </div>
        </div>

        <div className="col-span-2 max-md:col-span-5">
          <Sparkles size={200} className="mx-auto max-lg:hidden" />
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="link"
          render={<Link href="/courses">Courses</Link>}
          className="text-xl"
        ></Button>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link href={`/courses/${course.slug}`} key={course.slug}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="link"
          render={<Link href="/projects">Projects</Link>}
          className="text-xl"
        ></Button>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <CourseCard course={project} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="link"
          render={<Link href="/source-codes">Source codes</Link>}
          className="text-xl"
        ></Button>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {source_codes.map((codes) => (
            <SourceCodeCard sourceCode={codes} key={codes.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
