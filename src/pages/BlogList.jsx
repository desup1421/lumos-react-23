import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useFetch from "../utils/hooks/useFetch";

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from the query parameter or default to 1
  const [initialPage, setInitialPage] = useState(1);
  useEffect(() => {
    navigate(`${location.pathname}?page=${initialPage}`);
  }, [initialPage]);


  // Get the posts from the JSON server
  const { data, loading, error, lastPage, response } = useFetch(
    `http://localhost:3000/posts?_page=${initialPage}&_per_page=5`
  );
  error && console.error(error)
  console.log(response);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <section className="row">
        {loading && <div>Loading...</div>}
        {data.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <Link to={`/post/${post.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img
                  src={post.img}
                  className="card-img-top img-cstm"
                  alt={post.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setInitialPage(initialPage - 1)}
          disabled={initialPage === 1}
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setInitialPage(initialPage + 1)}
          disabled={initialPage === lastPage}
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogList;
