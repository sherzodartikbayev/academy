import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-1">
        <Image src={"/logo.svg"} alt="Academy logo" width={50} height={50} />
        <div className="text-4xl font-bold font-space-grotesk">Academy</div>
      </div>
    </Link>
  );
};

export default Logo;
