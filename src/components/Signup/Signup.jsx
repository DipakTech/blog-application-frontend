import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Signup.css";
import AuthLayout from "../../Layout/AuthLayout";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setSubmitting(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setErrorMsg("Passwords do not match");
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 3000);
      setSubmitting(false);
      event.stopPropagation();
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        setSubmitting(false);
        navigate("/login");
      })
      .catch((err) => {
        setSubmitting(false);
        setError(true);
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setError(false);
          setErrorMsg("");
        }, 3000);
      });

    setValidated(true);
  };

  return (
    <>
      <NavBar />
       <AuthLayout
        title={
          <>
            Welcome back to <br /> our community
          </>
        }
      >
        <h3 className="text-center text-xl font-semibold text-gray-700">Login to Account</h3>
        <p className="text-center text-sm mt-2 mb-10">
          Please sign-in to your account and start the adventure.
        </p>

        {error && (
          <div className="my-2 text-center text-red-600 bg-red-100 py-2 rounded-md">
            Invalid email or password
          </div>
        )}

        <form className="space-y-5" noValidate validated={validated} onSubmit={handleSubmit}>
          <div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label={"Email"}
              id="name"
            type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
            />
          </div>
          <div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label={"Email"}
              id="email"
                   type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
            />
          </div>

          <div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label={"Password"}
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label={"Password"}
              id="password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                {...(submitting ? { disabled: true } : {})}
          >Sign up</button>
           <div className="error">{error && <p>{errorMsg}</p>}</div>
          <div className="flex items-center justify-center space-x-3">
            <hr className="w-12" />
            <span className="font-bold uppercase text-xs text-gray-400">Or</span>
            <hr className="w-12" />
          </div>

          <div className="flex items-center space-x-4 lg:space-x-2 xl:space-x-4 text-sm font-semibold">
                    <Link to="#google-auth"  className="transition-all duration-300 px-2 border py-3 rounded-md border-gray-300 w-full flex justify-center items-center space-x-2 hover:bg-gray-300">
                        <FcGoogle className="h-5 w-5 lg:w-4 lg:h-4 xl:h-5 xl:w-5" />
                        <span className="text-[0.7rem] md:text-sm lg:text-[0.7rem] xl:text-sm">
                            Continue with Google
                        </span>
                    </Link>

                    <Link to="#facebook-auth" className="transition-all duration-300 px-2 border py-3 rounded-md border-gray-300 w-full flex justify-center items-center space-x-2 hover:bg-gray-300">
                        <RiFacebookCircleFill className="h-5 w-5 lg:w-4 lg:h-4 xl:h-5 xl:w-5 text-blue-600" />

                        <span className="text-[0.7rem] md:text-sm lg:text-[0.7rem] xl:text-sm">
                            Continue with Facebook
                        </span>
                    </Link>
                </div>


          <p className="text-sm text-center">
            Already have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </AuthLayout>





      <Footer />
    </>
  );
}
