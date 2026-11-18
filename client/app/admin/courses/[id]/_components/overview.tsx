"use client";

import { updateCourse } from "@/actions/admin.action";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { overviewSchema } from "@/lib/validation";
import { CourseType } from "@/types/app.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { VscDiscard } from "react-icons/vsc";
import z from "zod";

interface Props {
  courseData: CourseType;
}

const Overview = ({ courseData }: Props) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof overviewSchema>>({
    resolver: zodResolver(overviewSchema),
    defaultValues: courseData,
  });

  async function onSubmit(values: z.infer<typeof overviewSchema>) {
    setLoading(true);
    try {
      await updateCourse(courseData._id, values);
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
  }

  const toggleEdit = () => setEdit((prev) => !prev);

  return (
    <div className="bg-sidebar p-6 rounded-md border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold font-space-grotesk">Overview</h2>
        <Button size="icon" variant="secondary" onClick={toggleEdit}>
          {edit ? <X /> : <Pencil />}
        </Button>
      </div>

      <Separator className="my-4" />

      {!edit && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-0">
            <h3 className="text-lg font-medium">Title</h3>
            <p className="text-muted-foreground">{courseData.title}</p>
          </div>

          <div className="flex flex-col space-y-0">
            <h3 className="text-lg font-medium">Slug</h3>
            <p className="text-muted-foreground">{courseData.slug}</p>
          </div>

          <div className="flex flex-col space-y-0 col-span-2">
            <h3 className="text-lg font-medium">Excerpt</h3>
            <p className="text-muted-foreground">
              {courseData.excerpt || "No excerpt provided for this course"}
            </p>
          </div>

          <div className="flex flex-col space-y-0">
            <h3 className="text-lg font-medium">Category</h3>
            <p className="text-muted-foreground">{courseData.category}</p>
          </div>

          <div className="flex flex-col space-y-0">
            <h3 className="text-lg font-medium">Level</h3>
            <p className="text-muted-foreground">{courseData.level}</p>
          </div>

          <div className="flex flex-col space-y-0">
            <h3 className="text-lg font-medium">Course for whom</h3>
            <p className="text-muted-foreground">
              {courseData.forWhom ||
                "No target audience provided for this course"}
            </p>
          </div>

          <div className="flex flex-col space-y-0">
            <h3 className="text-lg font-medium">What students will learn?</h3>
            <p className="text-muted-foreground">
              {courseData.whatYouWillLearn ||
                "No information provided for this course"}
            </p>
          </div>

          <div className="flex flex-col space-y-0 col-span-2">
            <h3 className="text-lg font-medium">Keywords</h3>
            <p className="text-muted-foreground line-clamp-4">
              {courseData.keywords || "No keywords provided for this course"}
            </p>
          </div>
        </div>
      )}

      {edit && (
        <>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor="email">Title</Label>
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
                name="excerpt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="gap-2 col-span-2"
                    data-invalid={fieldState.invalid}
                  >
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      {...field}
                      id="excerpt"
                      placeholder="Next.js course"
                      className="resize-none h-24"
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
                    <Select onValueChange={field.onChange} disabled={loading}>
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
                    <Select onValueChange={field.onChange} disabled={loading}>
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

              <Controller
                name="forWhom"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-1" data-invalid={fieldState.invalid}>
                    <Label htmlFor="forWhom">For whom</Label>
                    <Textarea
                      {...field}
                      id="forWhom"
                      placeholder="This course is for ..."
                      className="h-24 resize-none"
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
                name="whatYouWillLearn"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-1" data-invalid={fieldState.invalid}>
                    <Label htmlFor="whatYouWillLearn">
                      What you will learn
                    </Label>
                    <Textarea
                      {...field}
                      id="whatYouWillLearn"
                      placeholder="In this course you will learn ..."
                      className="h-24 resize-none"
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
                name="keywords"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="gap-2 col-span-2"
                    data-invalid={fieldState.invalid}
                  >
                    <Label htmlFor="keywords">Keywords</Label>
                    <Textarea
                      {...field}
                      id="keywords"
                      placeholder="Next.js course, React course, Frontend course"
                      className="h-24"
                      disabled={loading}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                onClick={toggleEdit}
                disabled={loading}
              >
                <VscDiscard />
                <span>Cancel</span>
              </Button>
              <Button type="submit" size="lg">
                <span>Save changes</span>
                {loading ? <Spinner /> : <Save />}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Overview;
