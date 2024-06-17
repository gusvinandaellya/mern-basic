import React from "react";
import './upload.scss';

const Upload = ({img, ...rest}) => {
  return (
    <div className="upload">
      {img && <img src={img} alt="preview" className="preview"/>}
      <input type="file" {...rest}/>
    </div>
  )
}

export default Upload;