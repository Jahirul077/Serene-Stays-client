import React, { useContext, useEffect } from "react";
import "./Navber.css";
import { Link, NavLink } from "react-router-dom";
import ToggleButtons from "../DarkMod/ToggleButtons";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navber = () => {
  const { user, userData, logOutUser } = useContext(AuthContext);

  // console.log(userData)

  const handleSignOut = () => {
    logOutUser();
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/availableRooms"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Room
        </NavLink>
      </li>
      {user || userData ? 
        <li>
          <NavLink
            to="/bookings"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            My Booking
          </NavLink>
        </li>
        : null
      }
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="">
      <div className="navbar container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 my-2 shadow "
            >
              {links}

              <div>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="btn btn-sm my-2 w-full bg-purple-500 text-white"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link to="/logIn">
                    <button className="btn btn-sm my-2 w-full bg-purple-500 text-white">
                      Log In
                    </button>
                  </Link>
                )}
              </div>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl text-white mr-32 uppercase">Serene Stays</a>
          <div className=" hidden lg:flex text-white">
            <ul className="flex w-96 gap-6 px-1">{links}</ul>
          </div>
        </div>
        <div className="navbar-end ">
          {user ? (
            <div
              className="avatar mr-6 tooltip tooltip-bottom tooltip-primary dark:tooltip-info"
              data-tip={user?.displayName ? user?.displayName : userData?.name}
            >
              <div className="ring-primary dark:ring-white ring-offset-base-100  w-10 md:w-12 rounded-full ring ring-offset-2">
                <img
                  src={user?.photoURL ? user?.photoURL : userData?.photoURL}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {user ? (
            <button
              onClick={handleSignOut}
              className="btn hidden lg:flex mr-4  bg-red-600 hover:bg-red-500 text-white border-none rounded-md "
            >
              Log Out
            </button>
          ) : (
            <Link to="/logIn">
              <button className="btn hidden lg:flex mr-4  bg-green-600 hover:bg-green-500 border-none  text-white rounded-md">
                Log In
              </button>
            </Link>
          )}
          <ToggleButtons />
        </div>
      </div>
    </div>
  );
};

export default Navber;
