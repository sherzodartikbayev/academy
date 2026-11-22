"use client";

import { createSection } from "@/actions/admin.action";
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
import { sectionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const CreateSectionModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id: courseId } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof sectionSchema>) {
    setLoading(true);
    try {
      await createSection({ title: values.title, courseId });
      toast.add({
        type: "success",
        description: "Section created successfully",
      });
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

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="default" size={"sm"} />}>
        <span>Add</span>
        <Plus />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create section</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the details below to create a new section. You can always
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

export default CreateSectionModal;
