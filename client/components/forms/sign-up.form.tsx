"use client";

import CompleteProfile from "@/app/(browse)/(auth)/sign-up/_components/complete-profile";
import PasswordField from "@/app/(browse)/(auth)/sign-up/_components/password-field";
import VerifyEmail from "@/app/(browse)/(auth)/sign-up/_components/verify-email";
import { useSignUpStore } from "@/stores/use-sign-up.store";

const SignUpForm = () => {
  const { step } = useSignUpStore();

  return (
    <>
      {step === "complete-profile" && <CompleteProfile />}
      {step === "password-field" && <PasswordField />}
      {step === "verify-email" && <VerifyEmail />}
      {step === "done" && <CompleteProfile />}
    </>
  );
};

export default SignUpForm;
