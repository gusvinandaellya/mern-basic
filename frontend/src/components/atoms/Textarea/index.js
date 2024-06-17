import React from "react";
import './textarea.scss';

const Textarea = ({...rest}) => {
  return (
    <div className="textarea-wrapper">
      <textarea className="textarea" {...rest}></textarea>
    </div>
  )
}

export default Textarea;