import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordFieldSchema } from "@/lib/validation";
import { useSignUpStore } from "@/stores/use-sign-up.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdArrowDropright } from "react-icons/io";
import z from "zod";

const PasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const { setStep } = useSignUpStore();

  const form = useForm<z.infer<typeof passwordFieldSchema>>({
    resolver: zodResolver(passwordFieldSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  function onSubmit(data: z.infer<typeof passwordFieldSchema>) {
    setStep("done");
  }

  return (
    <form
      className="w-full space-y-4 mt-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Label htmlFor="code">Confirm password</Label>
            <div className="relative">
              <Input
                {...field}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                aria-invalid={fieldState.invalid}
              />
              {showConfirmPassword ? (
                <EyeOff
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer"
                  onClick={() => setshowConfirmPassword(false)}
                  role="button"
                />
              ) : (
                <Eye
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer"
                  onClick={() => setshowConfirmPassword(true)}
                  role="button"
                />
              )}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full group"
      >
        <span>Create account</span>
        <IoMdArrowDropright className="size-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
};

export default PasswordField;
