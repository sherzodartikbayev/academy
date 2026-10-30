"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { verifyEmailSchema } from "@/lib/validation";
import { useSignUpStore } from "@/stores/use-sign-up.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { IoMdArrowDropright } from "react-icons/io";
import z from "zod";

const VerifyEmail = () => {
  const { setStep } = useSignUpStore();

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    setStep("password-field");
  }

  return (
    <form
      className="w-full space-y-4 mt-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="code"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Label htmlFor="code">One-time password</Label>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup className="w-full">
                <InputOTPSlot index={0} className="w-full" />
                <InputOTPSlot index={1} className="w-full" />
                <InputOTPSlot index={2} className="w-full" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="w-full">
                <InputOTPSlot index={3} className="w-full" />
                <InputOTPSlot index={4} className="w-full" />
                <InputOTPSlot index={5} className="w-full" />
              </InputOTPGroup>
            </InputOTP>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full group"
      >
        <span>Confirm</span>
        <IoMdArrowDropright className="size-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
};

export default VerifyEmail;
