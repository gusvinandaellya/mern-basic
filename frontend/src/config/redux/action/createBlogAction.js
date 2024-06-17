import Axios from "axios";

export const setForm = (formType, formValue) => {
  return {
    type: "SET_FORM_DATA",
    formType,
    formValue,
  };
}

export const setImgPreview = (payload) => {
  return {
    type: "SET_IMG_PREVIEW",
    payload,
  };
}

export const postToAPI = (form) => {
  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('content', form.body);
  formData.append('image', form.image);

  Axios.post('http://localhost:4000/v1/blog/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      console.log('Response: ', res);
    })
    .catch(err => {
      console.error('Error: ', err);
    })
}

export const updateToAPI = (form, id) => {
  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('content', form.body);
  formData.append('image', form.image);

  Axios.put(`http://localhost:4000/v1/blog/post/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      console.log('Response: ', res);
    })
    .catch(err => {
      console.error('Error: ', err);
    })
}