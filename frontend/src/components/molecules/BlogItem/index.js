import React from "react";
import "./blogitem.scss";
import {Button, Gap} from "../../atoms";
import {useNavigate} from "react-router-dom";

const BlogItem = (props) => {
  const navigate = useNavigate();
  const {image, title, name, date, content, _id, onDelete} = props;

  return (
    <div className="blog-item">
      <img className="image-thumb" src={image} alt="Post"/>
      <div className="content-detail">
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <div className="action-wrapper">
            <p className="edit" onClick={() => navigate(`/create-blog/${_id}`)}>Edit</p> | <p className="delete" onClick={() => onDelete(_id)}>Delete</p>
          </div>
        </div>
        <p className="author">{name} - {date}</p>
        <p className="body">{content}</p>
        <Gap height={20}/>
        <Button title="View Detail" onClick={() => navigate(`/detail-blog/${_id}`)}/>
      </div>
    </div>
  )
}

export default BlogItem;