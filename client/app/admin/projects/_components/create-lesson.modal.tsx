"use client";

import { createProjectLesson, updateLesson } from "@/actions/admin.action";
import Spinner from "@/components/shared/spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { lessonSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { LessonType } from "@/types/app.types";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Props {
  children: ReactNode;
  lessonId?: string;
  lessonData?: LessonType;
}

const CreateLessonModal = ({ children, lessonId, lessonData }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id: courseId } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
      hours: "0",
      minutes: "0",
      videoId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof lessonSchema>) {
    setLoading(true);
    try {
      if (lessonId) {
        await updateLesson(lessonId, { course: courseId, ...values });
        toast.add({
          type: "success",
          description: "Lesson updated successfully",
        });
      } else {
        await createProjectLesson({ course: courseId, ...values });
        toast.add({
          type: "success",
          description: "Lesson created successfully",
        });
      }
      form.reset();
      setOpen(false);
    } catch (error) {
      const result = error as Error;
      toast.add({
        type: "error",
        description: result.message,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (lessonData) {
      form.setValue("title", lessonData.title);
      form.setValue("content", lessonData.content);
      form.setValue("videoId", lessonData.videoId);
      form.setValue("hours", lessonData.hours.toString());
      form.setValue("minutes", lessonData.minutes.toString());
    }
  }, [lessonData, lessonId]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="default" size={"sm"} />}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {lessonId ? "Edit" : "Create"} lesson
          </AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to{" "}
            {lessonId ? "update lesson" : "create a new lesson"}. You can always
            edit these details later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Separator />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="title">Title</Label>
                <Input
                  {...field}
                  id="title"
                  placeholder="Introduction to JavaScript"
                  disabled={loading}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="videoId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="videoId">Video ID</Label>
                <Input
                  {...field}
                  id="videoId"
                  placeholder=""
                  disabled={loading}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="hours"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="hours">Hours</Label>
                  <Input
                    {...field}
                    id="hours"
                    disabled={loading}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="minutes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="minutes">Minutes</Label>
                  <Input
                    {...field}
                    id="minutes"
                    disabled={loading}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="content">Content</Label>
                <ReactQuill
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={loading}>
              {lessonId ? "Update" : "Create"}
              {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateLessonModal;
