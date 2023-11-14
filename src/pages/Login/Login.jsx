import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((res) => {
      const user = res.user;
      console.log(user);
    });

    // Validate captcha first

    // try {
    //     // Call the signIn function
    //     const result = await signIn(email, password);
    //     const user = result.user;
    //     console.log(user);

    Swal.fire({
      icon: "success",
      title: "User Login Successful.",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    navigate(from, { replace: true });
    // } catch (error) {
    //     // Handle login error
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Login failed',
    //         text: error.message || 'An error occurred during login.',
    //     });
    // }
  };

  return (
    <>
      <Helmet>
        <title>Tasty Bites | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in...</p>
          </div>
          <div className="card   shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link to="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
                <SocialLogin />
              </div>
            </form>
            <p className="text-center">
              <small>
                New Here?{" "}
                <Link to="/signup">
                  <span className="text-green-600 font-bold">
                    Create an account
                  </span>
                </Link>{" "}
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
