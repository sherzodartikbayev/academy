"use client";

import CreateCourseForm from "@/components/forms/create-course.form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CreateCourseModal = () => {
  return (
    <AlertDialog>
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

        <CreateCourseForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateCourseModal;
