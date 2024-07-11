import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle ] =useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

  return (
    <div>
      <Appbar />
      <div className=" flex justify-center px-12 py-10">
        <div className="max-w-screen-lg pt-10 mb-4 w-full text-slate-900">
          <div className="relative w-full h-10  ">
            <input
            onChange={(e) => {
                setTitle(e.target.value)
            }}
              className="peer w-full h-full border-gray-300  bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=""
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Title
            </label>
            <TextEditor onChange = {(e) => {
                setDescription(e.target.value)
            }}/>
            <div className="flex justify-center">
            <button
              onClick={ async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                  title,
                  content: description,
                },{
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`)
              }}
              type="submit"
              className="mt-4 inline-flex items-center px-5 py-2.5 text-md font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Publish post
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({ onChange } : {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
  return (
    <form className="py-4">
      <div className="w-full mb-4 border border-gray-300 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-400">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-400">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <div className="p-2 text-gray-500 ">Tell your story...</div>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded ">
          <label className="sr-only">Publish post</label>
          <textarea
          onChange={onChange}
            id="editor"
            rows={8}
            className="block w-full focus:outline-none px-2 py-3 text-md  bg-white border-0"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
      </div>
    </form>
  );
}
