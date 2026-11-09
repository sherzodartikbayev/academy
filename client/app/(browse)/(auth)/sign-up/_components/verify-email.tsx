"use client";

import AlertCard from "@/components/cards/alert.card";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { axiosClient } from "@/lib/http";
import { verifyEmailSchema } from "@/lib/validation";
import { useSignUpStore } from "@/stores/use-sign-up.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdArrowDropright } from "react-icons/io";
import z from "zod";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [message, setMessage] = useState("");

  const { user, setStep } = useSignUpStore();

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });

  async function onSubmit(values: z.infer<typeof verifyEmailSchema>) {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/api/otp/verify", {
        email: user?.email,
        otp: values.code,
      });
      if (data.success) {
        setStep("password-field");
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      if (result.message === "OTP expired") setIsExpired(true);
      setLoading(false);
      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/api/otp/send", {
        email: user?.email,
      });
      if (data.success) {
        setIsExpired(false);
        setMessage("A new has been sent to your email.");
        setTimeout(() => setMessage(""), 4000);
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      setIsExpired(true);
      setTimeout(() => setError(""), 4000);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <AlertCard message={error} variant="error" />}

      {message && <AlertCard message={message} variant="success" />}

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
              <InputOTP maxLength={6} disabled={loading} {...field}>
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

        {isExpired && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={handleResend}
            >
              <span>Resend Code</span>
              {loading ? <Spinner /> : <RotateCcw className="size-4" />}
            </Button>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full group">
          <span>Confirm</span>
          {loading ? (
            <Spinner />
          ) : (
            <IoMdArrowDropright className="size-4 transition-transform group-hover:translate-x-1" />
          )}
        </Button>
      </form>
    </>
  );
};

export default VerifyEmail;
