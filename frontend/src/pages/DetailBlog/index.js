import React, {useEffect} from "react";
import "./detailBlog.scss";
import {Gap, Link} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";

const DetailBlog = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [data, setData] = React.useState({});

  useEffect(() => {
    Axios.get(`http://localhost:4000/v1/blog/post/${id}`)
      .then(result => {
        setData(result.data.data);
      })
      .catch(err => {
        console.log('error: ', err);
      });

  }, [id]);
  if (data.author) {
    return (
      <div className="detail-blog-wrapper">
        <img className="img-cover" src={`http://localhost:4000/${data.image}`} alt="thumb"/>
        <p className="blog-title">{data.title}</p>
        <p className="blog-author">{data.author.name} - {data.createdAt}</p>
        <p className="blog-bpdy">{data.content}</p>
        <Gap height={20}/>
        <Link title="Kembali ke Home" onClick={() => navigate('/')}/>
      </div>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
}

export default DetailBlog;