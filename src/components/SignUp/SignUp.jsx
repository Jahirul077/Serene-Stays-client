import React, { useContext, useEffect } from "react";
import Navber from "../share/Navber/Navber";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const { creatUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        // console.log("Email: ", user.email);
        navigate(location.state ? location.state : "/");

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignForm = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.files[0];
    // const signData = {name, email, password, photo}
    console.log(photo);

    if (photo) {
      const fileSize = photo.size / 1024 / 1024;
      if (fileSize > 2) {
        Swal.fire("File size cannot exceed 2MB!");
        return;
      }

      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width > 250 || height > 250) {
          Swal.fire("Image size cannot exceed 250x250 pixels!");
        } else {
          const photoUrl = URL.createObjectURL(photo);

          creatUser(email, password)
            .then((result) => {
              const user = result.user;
              const createAt = result.user.metadata.createdAt;
              const currentUser = { name, email, password, photoUrl, createAt };
              console.log(currentUser);

              fetch("https://serene-stays-server-ten.vercel.app/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(currentUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);

                  navigate(location.state ? location.state : "/");
                  form.reset();
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

      img.src = URL.createObjectURL(photo);
    } else {
      Swal.fire("Select photo!");
    }
  };

  return (
    <div>
      <div
        className="w-full md:bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(https://i.postimg.cc/y6rfqGBP/2.jpg)" }}
      >
        <Navber />
        <div className="max-w-3xl mx-auto px-4 md:min-h-screen py-62">
          <div className=" flex-col">
            <div className="text-center ">
              <h1 className="text-5xl font-bold text-white  py-8">Sign now!</h1>
            </div>
            <div className=" dark:bg-white/30 bg-black/40 w-full  shrink-0 shadow-2xl">
              <div className="card-body">
                <form onSubmit={handleSignForm}>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-white dark:text-black dark:font-semibold">
                        Name
                      </span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="py-2 px-6 bg-transparent text-white dark:text-black rounded-none border border-white 
                      dark:border-black dark:border-2 placeholder:text-white/70 dark:placeholder:text-black/70 outline-none"
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-white dark:text-black dark:font-semibold">
                        Email
                      </span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="email"
                      className="py-2 px-6 bg-transparent text-white dark:text-black rounded-none border border-white 
                      dark:border-black dark:border-2 placeholder:text-white/70 dark:placeholder:text-black/70 outline-none"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white dark:text-black dark:font-semibold">
                        Password
                      </span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="password"
                      className="py-2 px-6 bg-transparent text-white dark:text-black rounded-none border border-white 
                      dark:border-black dark:border-2 placeholder:text-white/70 dark:placeholder:text-black/70 outline-none"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white dark:text-black dark:font-semibold">
                        Select Photo
                      </span>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      className=" rounded-none file:text-white file:bg-black  file:p-2 file:border-none text-white dark:text-black w-full bg-transparent border border-white 
                      dark:border-black dark:border-2"
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn rounded-none">Sign Up</button>
                  </div>
                </form>
                <button
                  onClick={handleGoogleLogIn}
                  className="btn rounded-none"
                >
                  Google Sign Up
                </button>
                <div className="text-white mt-4">
                  <p>
                    You Have Already a Account?
                    <Link to="/logIn">
                      <span className="text-blue-600 font-bold"> LogIn</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
