import { CalendarRange, Dot, ListOrdered, Monitor, Video } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Curriculum = () => {
  return (
    <div className="p-4 mt-5 lg:p-8 border rounded-lg bg-card">
      <h2 className="text-2xl font-space-grotesk font-semibold">Curriculum</h2>

      <div className="flex flex-row flex-wrap gap-6 mt-2">
        <div className="flex flex-col">
          <ListOrdered className="size-10" />
          <p className="font-space-grotesk">Modules</p>
          <p className="font-medium text-2xl">20</p>
        </div>
        <div className="flex flex-col">
          <Monitor className="size-10" />
          <p className="font-space-grotesk">Lessons</p>
          <p className="font-medium text-2xl">40</p>
        </div>
        <div className="flex flex-col">
          <CalendarRange className="size-10" />
          <p className="font-space-grotesk">Duration</p>
          <p className="font-medium text-2xl">7</p>
        </div>
      </div>

      <Accordion className="mt-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center gap-x-2 hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <div className="text-left font-semibold">
                  JavaScript foundation
                </div>
              </div>

              <div className="flex items-center text-sm max-md:hidden">
                <div>10 lessons</div>
                <Dot />
                <div>20 hours</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="border-l border-l-primary pl-4">
              <div
                className="flex items-center justify-between py-2 hover:opacity-75"
                role="button"
              >
                <div className="flex items-center gap-2">
                  <Video size={16} />
                  <p>Introduction to JavaScript</p>
                </div>
                <div className="text-sm">20 min</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex items-center gap-x-2 hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <div className="text-left font-semibold">
                  JavaScript foundation
                </div>
              </div>

              <div className="flex items-center text-sm max-md:hidden">
                <div>10 lessons</div>
                <Dot />
                <div>20 hours</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="border-l border-l-primary pl-4">
              <div
                className="flex items-center justify-between py-2 hover:opacity-75"
                role="button"
              >
                <div className="flex items-center gap-2">
                  <Video size={16} />
                  <p>Introduction to JavaScript</p>
                </div>
                <div className="">20 min</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Curriculum;
