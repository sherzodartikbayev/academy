import { MdArrowDropDown } from "react-icons/md";
import { Button } from "../ui/button";

const MoreButton = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <Button className="group rounded-full" size={"lg"}>
        <span>Load more</span>
        <MdArrowDropDown className="transition-transform group-hover:translate-y-1" />
      </Button>
    </div>
  );
};

export default MoreButton;
