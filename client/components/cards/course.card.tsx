import { CourseType } from "@/types/app.types";
import Image from "next/image";

interface CourseCardPros {
  course: CourseType;
}

const CourseCard = ({ course }: CourseCardPros) => {
  return (
    <div className="p-0 rounded-lg bg-card">
      <div className="relative h-52 w-full bg-sidebar rounded-lg">
        {course.previewImage ? (
          <Image
            src={course.previewImage}
            alt={course.title}
            fill
            className="rounded-lg object-cover"
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No thumbnail
          </div>
        )}
      </div>
      <h2 className="p-2 text-xl font-space-grotesk font-semibold">
        {course.title}
      </h2>
    </div>
  );
};

export default CourseCard;
