import React from "react";
import {Routes, Route} from "react-router-dom";
import {CreateBlog, DetailBlog, Home} from "../../pages";
import {Footer, Header} from "../../components";
import "./mainApp.scss";

const MainApp = () => {
  return (
    <div className="main-app-wrapper">
      <Header/>
      <div className="content-wrapper">
        <Routes>
          <Route path="/create-blog/:id?" element={<CreateBlog />} />
          <Route path="/detail-blog/:id" element={<DetailBlog />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default MainApp;