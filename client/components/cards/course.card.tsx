import { CourseType } from "@/types/app.types";
import Image from "next/image";

interface CourseCardPros {
  course: CourseType;
}

const CourseCard = ({ course }: CourseCardPros) => {
  return (
    <div className="p-0 rounded-lg bg-card">
      <div className="relative h-52 w-full bg-sidebar rounded-lg">
        <Image
          src={course.previewImage.url}
          alt={course.previewImage.key}
          fill
          className="rounded-lg object-cover"
          loading="eager"
        />
      </div>
      <h2 className="p-2 text-xl font-space-grotesk font-semibold">
        {course.title}
      </h2>
    </div>
  );
};

export default CourseCard;
