"use client";

import { signInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdArrowDropright } from "react-icons/io";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Reveal from "../shared/reveal";
import { axiosClient } from "@/lib/http";
import { Alert, AlertDescription } from "../ui/alert";
import ErrorAlert from "../shared/error-alert";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const schema = useMemo(() => signInSchema(needsPassword), [needsPassword]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const handleCheckEmail = async () => {
    setError("");

    const isValid = await form.trigger("email");
    if (!isValid) return;

    try {
      const { data } = await axiosClient.post("/api/auth/verify-email", {
        email: form.getValues("email"),
      });

      if (data.success) {
        setNeedsPassword(true);
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { email, password } = values;
    if (!email || !password) return;

    try {
      const { data } = await axiosClient.post("/api/auth/login", values);
      if (data.success) {
        signIn("credentials", {
          userId: data.data._id,
          callbackUrl: "/dashboard",
        });
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <>
      <>{error && <ErrorAlert message={error} />}</>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="email">Email address</Label>
              <Input
                {...field}
                id="email"
                placeholder="Enter your email"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCheckEmail();
                  }
                }}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {!needsPassword && (
          <Button
            type="button"
            className="w-full group"
            onClick={handleCheckEmail}
          >
            <span>Continue</span>
            <IoMdArrowDropright className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
        {needsPassword && (
          <Reveal>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="code">Password</Label>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      aria-invalid={fieldState.invalid}
                    />
                    {showPassword ? (
                      <EyeOff
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer"
                        onClick={() => setShowPassword(false)}
                        role="button"
                      />
                    ) : (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer"
                        onClick={() => setShowPassword(true)}
                        role="button"
                      />
                    )}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="mt-4 w-full group">
              <span>Continue</span>
              <IoMdArrowDropright className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Reveal>
        )}
      </form>
    </>
  );
};

export default SignInForm;
