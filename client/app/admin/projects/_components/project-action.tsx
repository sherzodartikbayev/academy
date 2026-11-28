"use client";

import { deleteCourse, updateCourse } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { CourseType } from "@/types/app.types";
import { ArrowLeft, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  courseData: CourseType;
}

const ProjectAction = ({ courseData }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const onUpdate = async () => {
    const confirm = window.confirm(
      "Are you sure you want to update this project?",
    );
    if (!confirm) return;

    setLoading(true);
    try {
      await updateCourse(id, { isPublished: !courseData.isPublished });
      toast.add({
        type: "success",
        description: "Project updated successfully",
      });
      router.push("/admin/projects");
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

  const onDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirm) return;

    setLoading(true);
    try {
      await deleteCourse(id);
      toast.add({
        type: "success",
        description: "Project deleted successfully",
      });
      router.push("/admin/projects");
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

  return (
    <div className="flex items-center gap-x-1">
      <Button
        variant="outline"
        disabled={loading}
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <Button variant="default" disabled={loading} onClick={onUpdate}>
        <span>{courseData.isPublished ? "Published" : "Draft"}</span>
      </Button>
      <Button variant="destructive" disabled={loading} onClick={onDelete}>
        <Trash />
        Delete
      </Button>
    </div>
  );
};

export default ProjectAction;
