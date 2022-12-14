import React from "react";
import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../../util/config";
import { useHistory } from "react-router-dom";
import { 
    BarChart 
  } from "@material-ui/icons";
toast.configure();
function Login(props) { 
  const history = useHistory();
  const [details, setDetails] = useState({ userId: "", password: "" });
  const isLoggin = props.setIsLogged;
  //sessionStorage.clear();
  const submitHandler = (e) => {
    e.preventDefault();
    if (details.userId.trim().length === 0) {
      toast.warn("Please enter username", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-error",
        autoClose: 1000,
      });
    } else if (details.password.trim().length === 0) {
      toast.warn("Please enter password", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else {
      console.log("userData", details);
      props.setBackDrop(true);
      axios
        .post(`${config.apiURL}/userlogin`, details)
        .then((result) => {
          props.setBackDrop(false);
          if (result.status === 200) {
              sessionStorage.setItem("isLoggedIn", true);
              sessionStorage.setItem("isAdmin", result.data.data.isAdmin);
            props.setLoginUser(true);
            history.replace("/dashboard");
          }
        })
        .catch((err) => {
          props.setBackDrop(false);
          toast.warn("Either the username or password is incorrect", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        });
    }
  };
  return (
    <div className="loginContainer">
      <form onSubmit={submitHandler} data-testid="form" className="loginForm">
              <div className="form-inner">
                  <BarChart className="sidebarIcon" style={{width:'2rem', height:'2rem'}} />
          <h2>Login</h2>
          <br />
          <div className="form-group">
            <label id="loginLabel" htmlFor="userId">
              Username
            </label>
            <input
              type="userId"
              name="userId"
              placeholder="Please enter username"
              id="userId"
              onChange={(e) =>
                setDetails({ ...details, userId: e.target.value })
              }
              value={details.userId}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Please enter password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <div className="form-group">
            <button className="userAddButton" style={{ marginTop: "15px", width:'75px' }}>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
