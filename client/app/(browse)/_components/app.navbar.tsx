import Logo from "@/components/shared/logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import UserBox from "@/components/shared/user-box";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { Contact, LogIn } from "lucide-react";
import { getServerSession, type Session } from "next-auth";
import Link from "next/link";
import { connection } from "next/server";

const AppNavbar = async () => {
  await connection();
  const session = (await getServerSession(auth)) as Session;

  return (
    <div className="w-full h-20 bg-sidebar border px-4 mt-2 rounded-lg sticky top-2 z-50">
      <div className="flex items-center justify-between h-full">
        <Logo />

        <div className="flex items-center lg:gap-x-2 gap-x-1">
          <SidebarTrigger />
          <ModeToggle />

          <Button
            render={
              <Link href="/contact">
                <Contact />
              </Link>
            }
            nativeButton={false}
            size="icon"
            variant="ghost"
            className="size-7"
          />
          {session?.user ? (
            <UserBox user={session.user} />
          ) : (
            <Button
              render={
                <Link href="/sign-in" className="flex items-center gap-2">
                  <span>Sign in</span>
                  <LogIn />
                </Link>
              }
              nativeButton={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
