"use client";

import { useSignUpStore } from "@/stores/use-sign-up.store";

const Title = () => {
  const { step, user } = useSignUpStore();

  if (step === "complete-profile") {
    return (
      <>
        <h2 className="text-xl font-space-grotesk font-semibold">
          Create your account
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Welcome! Please fill in the details to get started.
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
        We have sent 4 digits code to your email address{" "}
        <span className="font-bold text-primary">({user?.email})</span>. Please
        check your inbox and enter code below.
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
        <h2 className="text-xl font-space-grotesk font-semibold">All done</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Your account has been successfully created. You can now sign in and
          start using our service.
        </p>
      </>
    );
  }
};

export default Title;
