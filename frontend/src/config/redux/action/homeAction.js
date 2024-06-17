import Axios from 'axios';

export const setDataBlog = (page) => (dispatch) => {
  Axios.get(`http://localhost:4000/v1/blog/posts?page=${page}&perPage=2`)
    .then((res) => {
      const responseAPI = res.data;
      dispatch({type: 'UPDATE_DATA_BLOG', payload: responseAPI.data})
      dispatch({type: 'UPDATE_PAGE', payload: {
        currentPage: responseAPI.currentPage,
        totalPage: Math.ceil(responseAPI.totalItems / responseAPI.perPage)
      }})
    })
    .catch((err) => {
      console.log('error', err);
    });
}