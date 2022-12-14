import "./roles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import { config } from "../../util/config";
import MaterialTable from "material-table";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
toast.configure();
export default function Roles(props) {
  const url = `${config.apiURL}/getDeveloperRoles`;
  const history = useHistory();

  const [rolesData, setrolesData] = useState([]);
  const [checked, setChecked] = useState();

  useEffect(() => {
    props.setBackDrop(true);
    axios.get(url).then((json) => {
      setrolesData(json.data);
      props.setBackDrop(false);
    });
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const changeRole = (e) => {
    setrolesData(e.target.value);
  };
  const callrolesData = (data) => {
    // history.push({
    //   pathname: `/roles/${data._id}`,
    //   state: data
    // });
    toast.warn("Feature not implemented yet!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        {/* <h1 className="userTitle">Roles List</h1> */}
        {/* <Link to="/roles">
          <button className="userAddButton" onClick={callrolesData}>
            Create Role
          </button>
        </Link> */}
      </div>
      <form className="newUserForm" /*onSubmit={submitHandler}*/>
        <Container>
          <Row>
            <Col>
              <label className="required">Role</label>
              <input type="text" onChange={changeRole} />
            </Col>
            <Col>
              <label>Status</label>
              <Switch
                color="primary"
                checked={checked}
                onChange={handleChange}
                name="checked"
                value={checked}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <button className="newButton" type="submit">
                Submit
              </button>
            </Col>
          </Row>
        </Container>
      </form>
      <br />

      <MaterialTable
        title="Roles"
        columns={[
          { title: "Name", field: "developerRoleName" },
          {
            title: "Status",
            field: "isActive",
            render: (rowData) => {
              return (
                <div class={rowData.isActive ? "isActive" : "isDisabled"}>
                  <span>{rowData.isActive ? "Active" : "Disabled"}</span>
                </div>
              );
            },
          },
          {
            title: "Created",
            field: "createdOn",
            render: (rowData) => {
              return moment(new Date(rowData.createdOn)).format("DD MMM YYYY");
            },
          },
          {
            title: "Updated",
            field: "updatedOn",
            render: (rowData) => {
              return moment(new Date(rowData.updatedOn)).format("DD MMM YYYY");
            },
          },
        ]}
        data={rolesData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit roles",
            onClick: (event, rowData) => {
              callrolesData(rowData);
            },
          },
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          grouping: true,
          headerStyle: {
            backgroundColor: "rgb(39 37 37 / 95%)",
            color: "#fff",
            whiteSpace: "nowrap",
          },
        }}
      />
    </div>
  );
}
