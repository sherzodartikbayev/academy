import { deleteSection, updateSection } from "@/actions/admin.action";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { SectionType } from "@/types/app.types";
import { Grip, List, X } from "lucide-react";
import { useState } from "react";
import { debounce } from "lodash";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  section: SectionType;
  index: number;
}

const SectionCard = ({ section, index }: Props) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const onDelete = async () => {
    const isConfirm = confirm("Are you sure you want to delete this section?");
    if (!isConfirm) return;

    setLoading(true);

    try {
      await deleteSection(section._id, section.course.toString());
      toast.add({
        type: "success",
        description: "Section deleted successfully",
      });
    } catch (error) {
      const result = error as Error;
      toast.add({
        type: "error",
        description: result.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onUpdateSection = async (title: string) => {
    try {
      setLoading(true);
      await updateSection(section._id, { title });
      toast.add({
        type: "success",
        description: "Section updated successfully",
      });
      setEdit(false);
    } catch (error) {
      const result = error as Error;
      toast.add({
        type: "error",
        description: result.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const debouncedUpdate = debounce(onUpdateSection, 1000);

  return (
    <Draggable draggableId={section._id} index={index}>
      {(provided) => (
        <div
          className="flex items-center gap-x-2 rounded-md text-sm border-b bg-secondary group relative"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {loading && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center rounded-md z-10 animate-pulse">
              <Spinner />
            </div>
          )}
          <div
            className="rounded-l-md border-r border-r-foreground/30 px-2 py-3 transition-all hover:bg-sidebar cursor-pointer"
            {...provided.dragHandleProps}
          >
            <Grip />
          </div>

          {edit && (
            <div className="flex items-center w-1/2 relative">
              <Input
                defaultValue={section.title}
                className="flex-1 bg-sidebar focus-visible:ring-0"
                onChange={(e) => debouncedUpdate(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                className="size-7 absolute right-1"
                onClick={() => setEdit(false)}
              >
                <X />
              </Button>
            </div>
          )}
          {!edit && <span>{section.title}</span>}

          <div className="ml-auto flex items-center gap-x-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEdit(true)}
              disabled={loading}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
            >
              Delete
            </Button>
            <Button size="sm" onClick={() => setEdit(true)} disabled={loading}>
              <List />
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SectionCard;
