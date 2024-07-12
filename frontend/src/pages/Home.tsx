import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="text-gray-900">
      <div className="h-screen pb-14 bg-left bg-cover">
        <div className="w-full container mx-auto p-11">
          <div className="w-full flex items-center justify-between pb-11">
            <a
              className="flex items-center text-slate-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              <svg
                className="h-8 fill-current text-slate-900 pr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" />
              </svg>{" "}
              MEDIUM
            </a>
          </div>
        </div>

        <div className="container md:pt-50 mx-auto flex lg:flex-row justify-center">
          <div className="flex flex-col w-full xl:w-2/3 justify-center py-8 overflow-y-hidden">
            <h1 className="my-5 text-4xl md:text-6xl text-slate-600 font-bold leading-tight text-center slide-in-bottom-h1">
              World's first content writing platform
            </h1>
            <p className="md:text-2xl mb-11 px-4 py-4 text-center">
              Sub-hero message, not too long and not too short. Make it just
              right!
            </p>
            <div className="flex justify-center">
              <Link to={'/signin'}>
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-10 py-3 me-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Sign in
                </button>
              </Link>
              <Link to={'/signup'}>
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-10 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Sign up
                </button>
              </Link>
            </div>
            <div className="w-full pt-16 pb-6 text-lg text-center fade-in">
              <a
                className="text-gray-500 no-underline hover:no-underline"
                href="#"
              >
                &copy; Prabhat Teotia 2024
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
