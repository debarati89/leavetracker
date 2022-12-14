import React, { useEffect, useState } from "react";
import "./topbar.css";
import {
  ChatBubbleOutline,
  NotificationsNone,
  Settings,
  PowerSettingsNew,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
const onLogout = () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("isAdmin");
  window.location.reload();
};
export default function Topbar(props) {
  const [title, setTitle] = useState("");
  const history = useHistory();
  useEffect(() => {
    let pageTitle = sessionStorage.getItem("title");
    setTitle(pageTitle ? pageTitle : "Welcome");
  });

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="menuDiv" onClick={props.showMenuHandler}>
          <div className="bar1"></div>
          <div className="bar1"></div>
          <div className="bar1"></div>
        </div>
        <div className="topLeft">
          <span className="logo">
            Resource Forecast Tracker [<span className="title">{title}</span>]
          </span>
        </div>
        <div className="topleft">
          <div className="topbarIconContainer">
            <OverlayTrigger
              placement="bottom"
              trigger="focus"
              overlay={
                <Popover>
                  <Popover.Header as="h3">Notifications</Popover.Header>
                  <Popover.Body>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">Santosh:</span> new message{" "}
                        <span class="noti-title">Lock leave for Jan 2022</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">45 mins ago</span>
                      </p>
                    </div>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">Sunil:</span> new message{" "}
                        <span class="noti-title">
                          Jan 2022 locked for leaves
                        </span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">1 hrs ago</span>
                      </p>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button className="popoverbutton">
                <NotificationsNone />
              </Button>
            </OverlayTrigger>
            <span className="topIconBadge">8</span>
          </div>
          <div className="topbarIconContainer">
            <OverlayTrigger
              placement="bottom"
              trigger="focus"
              overlay={
                <Popover>
                  <Popover.Header as="h3">Messages</Popover.Header>
                  <Popover.Body>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">Santosh:</span> new message{" "}
                        <span class="noti-title">Apply leave for Jan 2022</span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">4 mins ago</span>
                      </p>
                    </div>
                    <div class="media-body">
                      <p class="noti-details">
                        <span class="noti-title">Sunil:</span> new message{" "}
                        <span class="noti-title">
                          Jan 2022 locked for leaves
                        </span>
                      </p>
                      <p class="noti-time">
                        <span class="notification-time">30 mins ago</span>
                      </p>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button className="popoverbutton">
                <ChatBubbleOutline />
              </Button>
            </OverlayTrigger>
            <span className="topIconBadge">2</span>
          </div>
          {/* <div className="topbarIconContainer">
            <OverlayTrigger
              placement="bottom"
              trigger="focus"
              overlay={
                <Popover>
                  <Popover.Header as="h3">Action Items</Popover.Header>
                  <Popover.Body>
                    <div class="media-body">
                      <button className="userAddButton" onClick={onLogout}>
                        {" "}
                        Logout
                      </button>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button className="popoverbutton">
                <Settings />
              </Button>
            </OverlayTrigger>
          </div> */}
          <div class="media-body">
            <button className="userButton" onClick={onLogout}>
              {" "}
              <PowerSettingsNew fontSize="large" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
