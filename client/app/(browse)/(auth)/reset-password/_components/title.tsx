"use client";

import { useResetPasswordStore } from "@/stores/use-reset-password.store";

const Title = () => {
  const { step, email } = useResetPasswordStore();

  if (step === "enter-email") {
    return (
      <>
        <h2 className="text-xl font-space-grotesk font-semibold">
          Reset Password
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Enter your email address below and we will send you a 4 digits code to
          reset your password.
        </p>
      </>
    );
  }

  if (step === "verify-email") {
    return (
      <>
        <h2 className="text-xl font-space-grotesk font-semibold">
          Verify Email
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          {" "}
          We have sent 4 digits code to your email address{" "}
          <span className="font-bold text-primary">({email})</span>. Please
          check your inbox and enter code below.
        </p>
      </>
    );
  }

  if (step === "password-field") {
    return (
      <>
        <h2 className="text-xl font-space-grotesk font-semibold">
          Set a password
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Create a strong password to secure your account.
        </p>
      </>
    );
  }

  if (step === "done") {
    return (
      <>
        <h2 className="text-xl font-space-grotesk font-semibold">
          Password Reset Successful
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          You can now use your new password to log in.
        </p>
      </>
    );
  }
};

export default Title;
