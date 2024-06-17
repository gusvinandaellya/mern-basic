import React, {useEffect} from "react";
import {Button, Gap, Input, Link, Textarea, Upload} from "../../components";
import './createBlog.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postToAPI, setForm, setImgPreview, updateToAPI} from "../../config/redux/action";
import Axios from "axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const {form, imgPreview} = useSelector(state => state.createBlogReducer);
  const {title, body} = form;
  const dispatch = useDispatch();
  const {id} = useParams();
  const [isUpdate, setIsUpdate] = React.useState(false);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      Axios.get(`http://localhost:4000/v1/blog/post/${id}`)
        .then(result => {
          const data = result.data.data;
          dispatch(setForm('title', data.title));
          dispatch(setForm('body', data.content));
          dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
  }, [id, dispatch]);

  const onSubmit = () => {
    if (isUpdate) {
      console.log('Update: ', form, id)
      updateToAPI(form, id);
    } else {
      console.log('Create: ', form)
      postToAPI(form);
    }
  }

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setForm('image', file));
    dispatch(setImgPreview(URL.createObjectURL(file)));
  }

  return (
    <div className="blog-post">
      <Link title="Kembali" onClick={() => navigate('/')}/>
      <p className="title">{isUpdate ? 'Update' : 'Create'} New Blog Post</p>
      <Input
        label="Title"
        placeholder="Title"
        value={title}
        onChange={(e) => dispatch(setForm('title', e.target.value))}
      />
      <Upload
        onChange={(e) => onImageUpload(e)}
        img={imgPreview}
      />
      <Textarea
        value={body}
        onChange={(e) => dispatch(setForm('body', e.target.value))}
      />
      <Gap height={20}/>
      <div className="button-action">
        <Button title={isUpdate ? 'Update' : 'Create'} onClick={onSubmit}/>
      </div>
      <Gap height={20}/>
    </div>
  )
}

export default CreateBlog;