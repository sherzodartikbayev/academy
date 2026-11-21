"use client";

import { UserType } from "@/types/app.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface UserBoxProps {
  user: UserType;
}

const UserBox = ({ user }: UserBoxProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-0"
        render={
          <div role="button" className="cursor-pointer">
            <Avatar>
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
              {user.avatar && (
                <AvatarImage src={user.avatar.url} alt={user.avatar.key} />
              )}
            </Avatar>
          </div>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="center">
        <div className="flex flex-col space-y-2 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground font-space-grotesk">
            {user.email}
          </p>

          <div className="flex items-center gap-x-2">
            <div>
              <Avatar>
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
                {user.avatar && (
                  <AvatarImage src={user.avatar.url} alt={user.avatar.key} />
                )}
              </Avatar>
            </div>

            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user.firstName}
                {user.lastName}
              </p>
            </div>
          </div>

          <DropdownMenuSeparator className="my-2" />

          <div className="">
            <Link href="/dashboard">
              <DropdownMenuItem
                className="cursor-pointer"
                render={<Link href="/dashboard" />}
              >
                Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBox;
