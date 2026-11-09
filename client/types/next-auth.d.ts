import { DefaultSession } from "next-auth";
import { UserType } from "./app.types";

declare module "next-auth" {
  type Session = {
    user: UserType & DefaultSession["user"];
  };
}
