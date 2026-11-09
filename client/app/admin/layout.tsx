import { SidebarProvider } from "@/components/ui/sidebar";
import { ChildProps } from "@/types/app.types";
import { Suspense } from "react";
import AdminSidebar from "./_components/admin.sidebar";
import AdminNavbar from "./_components/admin.navbar";

const Layout = ({ children }: ChildProps) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full lg:mr-2">
        <Suspense>
          <AdminNavbar />
        </Suspense>
        <div className="mt-2 max-w-6xl mx-auto mb-12">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
