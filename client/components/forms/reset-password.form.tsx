"use client";

import Done from "@/app/(browse)/(auth)/reset-password/_components/done";
import EnterEmail from "@/app/(browse)/(auth)/reset-password/_components/enter-email";
import PasswordField from "@/app/(browse)/(auth)/reset-password/_components/password-field";
import VerifyEmail from "@/app/(browse)/(auth)/reset-password/_components/verify-email";
import { useResetPasswordStore } from "@/stores/use-reset-password.store";

const ResetPasswordForm = () => {
  const { step } = useResetPasswordStore();

  return (
    <>
      {step === "enter-email" && <EnterEmail />}
      {step === "verify-email" && <VerifyEmail />}
      {step === "password-field" && <PasswordField />}
      {step === "done" && <Done />}
    </>
  );
};

export default ResetPasswordForm;
