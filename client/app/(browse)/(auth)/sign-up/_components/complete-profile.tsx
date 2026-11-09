"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeProfileSchema } from "@/lib/validation";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropright } from "react-icons/io";
import { useSignUpStore } from "@/stores/use-sign-up.store";
import { useState } from "react";
import { axiosClient } from "@/lib/http";
import Spinner from "@/components/shared/spinner";
import AlertCard from "@/components/cards/alert.card";

const CompleteProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setStep, setUser } = useSignUpStore();

  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: { email: "", firstName: "", lastName: "" },
  });

  async function onSubmit(values: z.infer<typeof completeProfileSchema>) {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/api/otp/send", {
        email: values.email,
        otp: form.getValues(),
      });
      if (data.success) {
        setStep("verify-email");
        setUser(values);
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <AlertCard message={error} variant="error" />}

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  {...field}
                  id="firstName"
                  placeholder="Your firstname"
                  aria-invalid={fieldState.invalid}
                  disabled={loading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  {...field}
                  id="lastName"
                  placeholder="Your lastname"
                  aria-invalid={fieldState.invalid}
                  disabled={loading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
                disabled={loading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full group">
          <span>Continue</span>
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

export default CompleteProfile;
