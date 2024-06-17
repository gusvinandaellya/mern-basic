import React, {useEffect} from "react";
import {BlogItem, Button, Gap} from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./home.scss";
import {setDataBlog} from "../../config/redux/action";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = React.useState(1);
  const {dataBlog, page} = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataBlog(counter));
  }, [counter, dispatch]);

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };

  const next = () => {
    setCounter(counter === page.totalPage ? page.totalPage : counter + 1);
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            Axios.delete(`http://localhost:4000/v1/blog/post/${id}`)
              .then(res => {
                dispatch(setDataBlog(counter));
              })
              .catch(err => {
                console.log('error: ', err);
              });
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }


  return (
    <div className="home-page-wrapper">
      <div className="create-wrapper">
        <Button title="Create Blog" onClick={() => navigate('/create-blog')}/>
      </div>
      <Gap height={20}/>
      <div className="content-wrapper">
        {dataBlog.map(blog => {
          return <BlogItem
            key={blog._id}
            image={`http://localhost:4000/${blog.image}`}
            title={blog.title}
            name={blog.author.name}
            date={blog.createdAt}
            content={blog.content}
            _id={blog._id}
            onDelete={confirmDelete}
          />
        })}
      </div>
      <div className="pagination">
        <Button title="Previous" onClick={previous}/>
        <p className="text-page">{page.currentPage} / {page.totalPage}</p>
        <Gap width={20}/>
        <Button title="Next" onClick={next}/>
      </div>
      <Gap height={20}/>
    </div>
  )
}

export default Home;