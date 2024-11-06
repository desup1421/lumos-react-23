import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

const BlogDetail = () => {
  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  const{ id } = useParams()

  // There is error make console.log looping when axios outside useEffect
  useEffect(() => {
    axios
    .get(`http://localhost:3000/posts/${id}`)
    .then((res) => {
      setPost(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);


  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-5">
      <button 
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <div className="card shadow-sm p-4">
        <img src={post.img} alt="Blog image" className="card-img-top" />
        <h1 className="card-title text-center">{post.title}</h1>
        <p className="card-text text-muted text-center">{post.desc}</p>
        <hr />
        <div className="card-body">{parse(post.content)}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
