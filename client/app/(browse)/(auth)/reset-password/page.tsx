import Link from "next/link";
import Title from "./_components/title";
import SocialButton from "../_components/social-button";
import { Separator } from "@/components/ui/separator";
import ResetPasswordForm from "@/components/forms/reset-password.form";

const ResetPasswordPage = () => {
  return (
    <div className="h-fit bg-card rounded-lg shadow-lg w-md">
      <div className="p-6">
        <Title />
        <SocialButton />
        <Separator className="my-6" />
        <ResetPasswordForm />
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

export default ResetPasswordPage;
