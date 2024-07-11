import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className=" border-b flex justify-between px-10 py-4">
      <Link to={"/blogs"}>
        <div className="flex flex-col justify-center font-bold text-2xl cursor-pointer">
          Medium
        </div>
      </Link>
      <div>
        <Link to = {'/publish'}>
          <button
            className="mr-8 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] rounded-full"
            type="button"
          >
            New
          </button>
        </Link>
        <Avatar size={"big"} name="Prabhat" />
      </div>
    </div>
  );
};
