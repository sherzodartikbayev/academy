import { Separator } from "@/components/ui/separator";
import SocialButton from "../_components/social-button";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="h-fit bg-card rounded-lg shadow-lg w-md">
      <div className="p-6">
        <h2 className="text-xl font-space-grotesk font-semibold">
          Sign in to Academy
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Welcome comeback! Please sign in to continue.
        </p>
        <SocialButton />
        <Separator className="my-6" />
      </div>
      <div className="bg-secondary py-6 rounded-lg text-center text-sm text-muted-foreground mt-5">
        Do not have an any account?{" "}
        <Link
          href="/sign-up"
          className="text-primary hover:underline font-medium"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
