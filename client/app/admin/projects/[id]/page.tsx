import { getCourse } from "@/actions/admin.action";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { projectTabItems } from "@/constants";
import Overview from "../_components/overview";
import Lessons from "../_components/lessons";
import Thumbnail from "../_components/thumbnail";
import Overviews from "../_components/reviews";
import ProjectAction from "../_components/project-action";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string; section?: string }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const { tab } = await searchParams;

  const { data } = await getCourse(id);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-space-grotesk font-semibold">
          {data.title}
        </h2>
        <ProjectAction courseData={data} />
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-5 gap-x-4">
        <div className="col-span-1">
          <div className="bg-sidebar rounded-md border p-2">
            <h3 className="font-space-grotesk font-semibold text-lg">
              Project Details
            </h3>
            <Separator className="my-2" />
            <div className="flex flex-col space-y-2">
              {projectTabItems.map((item) => (
                <Button
                  key={item.title}
                  variant={tab === item.title ? "secondary" : "ghost"}
                  className="flex justify-start w-full"
                  render={
                    <Link
                      href={{
                        pathname: `/admin/projects/${id}`,
                        query: { tab: item.title },
                      }}
                    >
                      <item.icon />
                      <span className="capitalize">{item.title}</span>
                    </Link>
                  }
                  nativeButton={false}
                ></Button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          {tab === "overview" && <Overview courseData={data} />}
          {tab === "lessons" && <Lessons courseData={data} />}
          {tab === "thumbnail" && <Thumbnail courseData={data} />}
          {tab === "reviews" && <Overviews courseData={data} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
