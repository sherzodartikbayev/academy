import { Separator } from "@/components/ui/separator";
import SocialButton from "../_components/social-button";
import SignUpForm from "@/components/forms/sign-up.form";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="h-fit bg-card rounded-lg shadow-lg w-md">
      <div className="p-6">
        <h2 className="text-xl font-space-grotesk font-semibold">
          Create your account
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Welcome! Please fill in the details to get started.
        </p>
        <SocialButton />
        <Separator className="my-6" />
        <SignUpForm />
      </div>
      <div className="bg-secondary py-6 rounded-lg text-center text-sm text-muted-foreground mt-5">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-primary hover:underline font-medium"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
