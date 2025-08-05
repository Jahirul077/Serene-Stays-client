import Navber from "../share/Navber/Navber";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";


const LogIn = () => {


  const {googleSignIn, SignInUser} = useAuth()
  const location = useLocation()
  const navigate = useNavigate();


  const handleLogForm = e => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const signData = { email, password, }
    // console.log(signData)

    SignInUser(email, password)
      .then(result => {
        const userlogged = result.user;
        console.log(userlogged);
        const user = { email }
        //get access Token
        axios.post(`https://serene-stays-server-ten.vercel.app/jwt`, user, { withCredentials: true })
          .then(res => {
            console.log(res.data);
            if(res.data.success){
              navigate(location.state ? location.state : "/");
            }

          })

      })
      .catch(error => {
        console.log(error);
      })

  }

  const handleGoogle = () => {
    googleSignIn()
      .then(result => {
        console.log(result.user);
        navigate(location.state ? location.state : "/");
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <div
        className="w-full md:bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(https://i.postimg.cc/9F6J0qDw/3.jpg)" }}
      >
        <Navber />
        <div className="max-w-3xl mx-auto px-4 md:min-h-screen py-32">
          <div className=" flex-col">
            <div className="text-center ">
              <h1 className="text-5xl font-bold text-white  py-8">Log now!</h1>
            </div>
            <div className=" dark:bg-white/30 bg-black/50 w-full  shrink-0 shadow-2xl">
              <div className="card-body">
                <form onSubmit={handleLogForm}>
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
                      <span className="label-text text-white dark:text-black  dark:font-semibold">
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
                  <div className="form-control mt-6">
                    <button className="btn rounded-none">Login</button>
                  </div>
                </form>
                <button onClick={handleGoogle} className="btn rounded-none">Google LogIn</button>
                <div className="text-white mt-4">
                  <p>
                    New user please?
                    <Link to='/signUp'>
                      <span className="text-green-500 font-bold"> SignUp</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn