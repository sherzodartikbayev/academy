import AlertCard from "@/components/cards/alert.card";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosClient } from "@/lib/http";
import { passwordFieldSchema } from "@/lib/validation";
import { useSignUpStore } from "@/stores/use-sign-up.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdArrowDropright } from "react-icons/io";
import z from "zod";

const PasswordField = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const { user, setStep } = useSignUpStore();

  const form = useForm<z.infer<typeof passwordFieldSchema>>({
    resolver: zodResolver(passwordFieldSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof passwordFieldSchema>) {
    setLoading(true);
    try {
      const payload = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        password: values.password,
      };
      const { data } = await axiosClient.post("/api/auth/register", payload);
      if (data.success) {
        setStep("done");
      }
    } catch (error) {
      const result = error as Error;
      setError(result.message);
      setTimeout(() => setError(""), 4000);
      setLoading(false);
    }
  }

  return (
    <>
      {error && <AlertCard message={error} variant="error" />}

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
                  disabled={loading}
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
                  disabled={loading}
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

        <Button type="submit" className="w-full group" disabled={loading}>
          <span>Create account</span>
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

export default PasswordField;
