import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import axios from "axios";
// import { FaSearch } from "react-icons/fa";
import Identicon from "react-identicons";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [show, setHamburger] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/user/data`, {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <>
      <nav className=" px-4 dark:bg-gray-800 dark:text-gray-100 sticky">
        <div className="w-full flex md:w-10/12 mx-auto">
          {/* Desktop version */}
          <div className="container fixed top-0 left-0 block justify-between  mx-auto md:flex dark:bg-slate-50">
            <a
              rel="noopener noreferrer"
              href="/"
              aria-label="Back to homepage"
              className="flex items-center p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="w-8 h-8 dark:text-violet-400"
                data-darkreader-inline-fill=""
              >
                <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
                <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
              </svg>
              Dipak's blog
            </a>
            <div className={`items-center  ${!show?'hidden':''}  flex-col mt-2 md:mt-0 md:flex-row md:space-x-4  md:flex`} >
              <div className="relative">
                <form
                  onSubmit={(e) => {
                    handleSearch(e);
                  }}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      title="Search"
                      className="p-1 focus:outline-none focus:ring"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 dark:text-gray-100"
                        data-darkreader-inline-fill=""
                      >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="Search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    placeholder="Search..."
                    className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
                  />
                </form>
              </div>
            {loggedIn ? (
              <>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="my-auto">
                    <button
                      type="button"
                      className="px-6 py-2 font-semibold  rounded lg:block dark:bg-violet-400 dark:text-gray-900"
                      onClick={() => {
                        navigate("/new");
                      }}
                    >
                      Create
                    </button>
                  </div>
                  <NavDropdown
                    title={
                      <Identicon
                        className="user-icon"
                        string={email}
                        size={30}
                      />
                    }
                  >
                    <NavDropdown.Item className="z-10 relative">{name}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </div>
              </>
            ) : (
              <div className="flex flex-col md:flex-row gap-3 py-2">
                <button
                  type="button"
                  className="px-6 py-1 font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="px-6 py-1 font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  signup
                </button>
                  </div>
                  )}
            </div>
          </div>
          <button onClick={() => setHamburger(!show)} title="Open menu" type="button" className=" md:hidden lg:hidden fixed right-3 top-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100" data-darkreader-inline-stroke="" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {/* //mobile view */}

        </div>
      </nav>

    </>
  )
}
