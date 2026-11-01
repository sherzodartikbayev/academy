import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { enterEmailSchema } from "@/lib/validation";
import { useResetPasswordStore } from "@/stores/use-reset-password.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { IoMdArrowDropright } from "react-icons/io";
import z from "zod";

const EnterEmail = () => {
  const { setStep, setEmail } = useResetPasswordStore();

  const form = useForm<z.infer<typeof enterEmailSchema>>({
    resolver: zodResolver(enterEmailSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: z.infer<typeof enterEmailSchema>) {
    setStep("verify-email");
    setEmail(values.email);
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full group"
      >
        <span>Continue</span>
        <IoMdArrowDropright className="size-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
};

export default EnterEmail;
