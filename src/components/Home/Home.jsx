import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaRegComment } from "react-icons/fa";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/posts`)
      .then((res) => {
        setBlogs(res.data.blogs);
        console.log(res.data.blogs)
        // setInterval(() => {
        //   setLoading(false);
        // }, 1000);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setInterval(() => {
        //   setLoading(false);
        // }, 1000);
        setLoading(false);
      });
  }, []);

  const handlePost = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="home-container">
        <h1 className="text-xl font-sans text-slate-300 text-center my-10 md:text-4xl pt-10">Recent Blogs</h1>
        {loading ? (
          <div className="loader">
            <BallTriangle
              radius="4px"
              color="#8b39bb"
              ariaLabel="loading-indicator"
            />
          </div>
        ) : (
            <Container>
              <div className="px-2 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
            {blogs.length > 0 ? (
              blogs.reverse().map((blog) => {
                return (
                  <div
                    key={blog._id}
                    onClick={() => {
                      handlePost(blog._id);
                    }}
                    className="overflow-hidden transition-shadow duration-300 bg-white rounded">
                    {

                        blog.cloudinaryId ? (
                      <a href="/" aria-label="Article">
                          <img
                            src={blog.image}
                            className="object-cover w-full h-60 rounded"
                            alt=""
                          />
                        </a>
                    ) : null}


                        <div className="py-5 px-3">
                          <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                             {new Date(blog.created_at).toDateString()}
                      </p>
                      <p>{ blog.author}</p>
                          <a
                            href="/"
                            aria-label="Article"
                            className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                          >
                            <p className="text-2xl font-bold leading-5">{blog.title}</p>
                          </a>
                          {/* <p className="mb-4 text-gray-700">
                            Sed ut perspiciatis unde omnis iste natus error sit sed quia
                            consequuntur magni voluptatem doloremque.
                          </p> */}
                          <div className="flex space-x-4">
                            <a
                              href="/"
                              aria-label="Likes"
                              className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                            >
                              <div className="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                                >
                                  <polyline
                                    points="6 23 1 23 1 12 6 12"
                                    fill="none"
                                    strokeMiterlimit="10"
                                  />
                                  <path
                                    d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit="10"
                                  />
                                </svg>
                              </div>
                              <p className="font-semibold"> {blog.likes.length} Reactions</p>
                            </a>
                            <a
                              href="/"
                              aria-label="Comments"
                              className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                            >
                              <div className="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                                >
                                  <polyline
                                    points="23 5 23 18 19 18 19 22 13 18 12 18"
                                    fill="none"
                                    strokeMiterlimit="10"
                                  />
                                  <polygon
                                    points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit="10"
                                  />
                                </svg>
                              </div>
                              <p className="font-semibold">{blog.comments.length} </p>
                            </a>
                          </div>
                        </div>
                  </div>
                );
              })
              ) : (
                <>
                <h1>No Blogs Avaliable</h1>
                <p>Write Your own Blog !!</p>
              </>
                  )}
                  </div>
            </div>
            </Container>
        )}
      </div>
      <Footer />
    </>
  );
}
