import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-20">
          <div className="grid-cols-8 col-span-8">
            <div className="text-4xl font-extrabold max-w-3xl">{blog.title}</div>
            <div className="text-slate-600 pt-3">Posted on 2 December 2024</div>
            <div className="pt-5">{blog.content}</div>
          </div>
          <div className="col-span-4 pl-12">
            <div className="text-slate-700 text-lg">
                Author
            </div>
            <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className=" pt-2 text-slate-500">
                  Random catching phrase about the author
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
