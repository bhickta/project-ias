import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/free-brands-svg-icons";
import {
  faInstagram,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { INSTA_URL, TELEGRAM_URL, TOPICS_URL } from "../constants/constants";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import TreeMenu from "./TreeMenu";

const Dashboard = (props) => {
  const node = useRef();
  var userEmail = props.email;
  const [menu, setMenu] = useState([]);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    } else {
      props.hide();
    }
  };

  useEffect(() => {
    axios
      .get(TOPICS_URL)
      .then((Response) => {
        console.log("menu : " + Response.data.children);
        setMenu([Response.data]);
      })
      .catch((err) => console.log(err));

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  if (userEmail === null || userEmail === undefined || userEmail === "")
    userEmail = "User";

  const emailDiv = (
    <div>
      <div className="email-logo-div">
        <div className="email-logo">{userEmail.charAt(0)}</div>
      </div>
      <div className="email-text">{userEmail}</div>
    </div>
  );

  var menuDiv = null;

  if (menu) {
    menuDiv = (
      <div className="tree-menu">
        <TreeMenu data={menu} />
      </div>
    );
  }

  return (
    <div className="dashboard-cover">
      <div className="dashboard-div" ref={node}>
        <div className="menu-exit">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => {
              props.hide();
            }}
          />
        </div>
        {emailDiv}
        {menuDiv}
        <div className="contact-us">
          <div className="contact-us-text">Contact Us!</div>
          <div className="icons-div">
            <FontAwesomeIcon
              icon={faTelegramPlane}
              onClick={() => window.open(TELEGRAM_URL, "_blank")}
              className="link-icon"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              onClick={() => window.open(INSTA_URL, "_blank")}
              className="link-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
