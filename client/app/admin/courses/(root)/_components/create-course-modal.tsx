"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { createCourse } from "@/actions/admin.action";
import { createCourseSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import Spinner from "../../../../../components/shared/spinner";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateCourseModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      slug: "",
      level: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createCourseSchema>) {
    setLoading(true);
    try {
      await createCourse({ ...values, type: "course" });
      toast.add({
        type: "success",
        description: "Course created successfully",
      });
      form.reset();
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

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="default" size={"sm"} />}>
        Create course
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create course</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to create a new course. You can always
            edit these details later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Separator />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    {...field}
                    id="title"
                    placeholder="Next.js"
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
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    {...field}
                    id="slug"
                    placeholder="nextjs"
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
              name="level"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="FRONTEND">Frontend</SelectItem>
                        <SelectItem value="BACKEND">Backend</SelectItem>
                        <SelectItem value="MOBILE">Mobile</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={loading}>
              Submit
              {loading && <Spinner />}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateCourseModal;
