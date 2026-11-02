import { CalendarDays, List, Star, User } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="p-4 lg:p-8 bg-sidebar border rounded-lg grid grid-cols-5 gap-x-4 items-center bg-linear-to-br from-sidebar to-primary/50">
      <div className="col-span-3 space-y-4 max-md:col-span-5">
        <div className="h-52 md:hidden w-full relative rounded-lg">
          <Image src={"/courses/javascript.webp"} alt="JavaScript" fill className="object-cover rounded-lg" />
        </div>
        <h1 className="text-3xl font-space-grotesk font-semibold">
          JavaScript
        </h1>
        <p className="text-sm text-muted-foreground leading-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati id
          quisquam tempore non qui, saepe amet ipsum atque quibusdam
          perspiciatis aut eos magni tenetur distinctio animi sint iusto
          nesciunt. Suscipit.
        </p>

        <div className="flex items-center gap-x-6 flex-wrap">
          <div className="flex items-center gap-x-2">
            <User className="size-5" />
            <span>100 students</span>
          </div>
          <div className="flex items-center gap-x-2">
            <CalendarDays className="size-5" />
            <span>2024, 1-August</span>
          </div>
          <div className="flex items-center gap-x-2">
            <List className="size-5" />
            <span>48 lessons</span>
          </div>
        </div>

        <div className="flex items-center gap-x-6 flex-wrap">
          <div className="">
            Duration: <span className="font-bold">12 hours 55 minutes</span>
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-yellow-600 font-semibold">5</span>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                className="size-4 text-yellow-600 fill-yellow-600"
                key={idx}
              />
            ))}
            <span>(120)</span>
          </div>
        </div>
      </div>

      <div className="col-span-2 relative h-64 w-full max-md:hidden">
        <Image
          src={"/courses/javascript.webp"}
          alt="JavaScript"
          fill
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
