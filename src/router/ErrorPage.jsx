import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="text-center text-3xl font-semibold pt-52 bg-black h-screen"
    >
      <h1 className="text-red-500">Oops!</h1>
      <div className="text-white">
        <p>Sorry, an unexpected error has occurred</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <Link to="/" >
        <button className="  py-4 px-8 my-8 bg-white">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
