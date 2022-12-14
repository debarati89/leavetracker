import "./locations.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../util/config";
import MaterialTable from "material-table";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

export default function Locations(props) {
  const url = `${config.apiURL}/getLocations`;
  const history = useHistory();

  const [locationsData, setlocationsData] = useState([]);

  useEffect(() => {
    props.setBackDrop(true);
    axios.get(url).then((json) => {
      setlocationsData(json.data);
      props.setBackDrop(false);
    });
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  };
  const calllocationsData = (data) => {
    history.push({
      pathname: `/locations/${data._id}`,
      state: data,
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Locations List</h1>
        <Link to="/locations">
          <button className="userAddButton" disabled>
            {" "}
            Create New
          </button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Locations"
        columns={[
          { title: "Name", field: "locationName" },
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
        data={locationsData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit Location",
            onClick: (event, rowData) => {
              toast.warn("Feature not implemented yet!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
              });
            },
          },
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
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
