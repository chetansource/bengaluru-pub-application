import Link from "next/link";
import "app/globals.css";
import { DropdownMenuDemo } from "./DropDownMenu";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full h-14 lg:h-20 bg-white border-b-2 drop-shadow-xl border-black  px-12 py-2 fontFamily z-50 ">
      {/* Logo  and left links*/}
      <div className="py-2 lg:py-5 lg:px-5 flex gap-8 font-bold text-lg lg:text-2xl  flex-row justify-between">
        <Link href="/">BADD</Link>
        <div className="lg:pb-2 lg:pr-10">
          <DropdownMenuDemo />
        </div>
      </div>
    </div>
  );
}
