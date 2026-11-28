import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CourseType } from "@/types/app.types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  course: CourseType;
}

const CourseCard = ({ course }: Props) => {
  return (
    <div className="p-0 rounded-lg bg-card">
      <div className="relative h-52 w-full bg-sidebar rounded-lg">
        {course.previewImage ? (
          <Image
            src={course.previewImage}
            alt={course.title}
            fill
            className="rounded-t-lg object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full text-9xl font-black text-muted-foreground">
            {course.title.charAt(0)}
          </div>
        )}

        <div className="absolute top-2 left-2 flex gap-x-1">
          <Badge variant="outline">{course.level}</Badge>
          <Badge variant="secondary">{course.category}</Badge>
        </div>
      </div>

      <Separator />
      <div className="flex items-center justify-between p-2">
        <h2 className="p-2 text-xl font-space-grotesk font-semibold">
          {course.title}
        </h2>
        <Button
          size="sm"
          variant="secondary"
          render={
            <Link href={`/admin/courses/${course._id}?tab=overview`}>Edit</Link>
          }
          nativeButton={false}
        ></Button>
      </div>
    </div>
  );
};

export default CourseCard;
