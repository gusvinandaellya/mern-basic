import React from "react";
import './footer.scss';
import {ICDiscord, ICFacebook, ICGithub, ICInstagram, ICTelegram, ICTwitter, Logo} from "../../../assets";

const Icon = ({img}) => {
  return (
    <div className="icon-wrapper">
      <img className="icon-social-media" src={img} alt="Icon"/>
    </div>
  )
}
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div>
          <img className="logo" src={Logo} alt="Logo"/>
        </div>
        <div className="social-wrapper">
          <Icon img={ICFacebook}/>
          <Icon img={ICInstagram}/>
          <Icon img={ICTelegram}/>
          <Icon img={ICDiscord}/>
          <Icon img={ICGithub}/>
          <Icon img={ICTwitter}/>
        </div>
      </div>
      <div className="copyright">
      <p>Copyright</p>
      </div>
    </div>
  )
}

export default Footer;