import React from "react";
import { useNavigate } from "react-router-dom";

import "./PageNotFound.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";


const PageNotFound = () => {
  const Navigate = useNavigate()

    const backHomeHandeler = () => {
    Navigate('/')
  }

  return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">الصفحة غير موجودة!</span>
                <a className="back_Home" onClick={backHomeHandeler}>Go to Home</a>
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;