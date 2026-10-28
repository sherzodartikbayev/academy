import { ChildProps } from "@/types/app.types";

const Layout = ({ children }: ChildProps) => {
  return (
    <div className="mt-4 flex justify-center items-center h-[80vh]">
      {children}
    </div>
  );
};

export default Layout;
