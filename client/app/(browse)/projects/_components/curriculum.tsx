import { Separator } from "@/components/ui/separator";
import { Dot, Video } from "lucide-react";

const Curriculum = () => {
  return (
    <div className="p-4 mt-5 lg:p-8 border rounded-lg bg-card">
      <h2 className="text-2xl font-space-grotesk font-semibold">Curriculum</h2>

      <div className="flex items-center">
        <p>23 lessons</p>
        <Dot />
        <p>Approx. 40 hours to complete.</p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between py-2 hover:opacity-75">
          <div className="flex items-center gap-2">
            <Video size={16} />
            <p>Introduction to JavaScript</p>
          </div>
          <div className="text-sm">20 min</div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
