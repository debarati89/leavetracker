import "./resourceList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../util/config";
import MaterialTable from "material-table";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { getSortOrder } from "../../util/utility";

export default function ResourceList(props) {
  const url = `${config.apiURL}/getResources`;
  const history = useHistory();
  const [resourceData, setResourceData] = useState([]); 
  useEffect(() => {
    props.setBackDrop(true);
    axios.get(url).then((json) => {
      setResourceData(json.data.sort(getSortOrder('name')));
      props.setBackDrop(false);
    }).catch(err=> props.setBackDrop(false));
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  };
  const callResourceData = (data) => {
    history.push({
      pathname: `/resource/${data._id}`,
      state: data,
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Resources List</h1>
        <Link to="/resource">
          <button className="userAddButton">Create Resource</button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Resource List"
        columns={[
          { title: "Name", field: "name" },
          { title: "Location", field: "location" },
          {
            title: "Start date",
            field: "startDate",
            type: "date",
            render: (rowData) => {
              return moment(new Date(rowData.startDate)).format("DD MMM YYYY");
            },
          },
          {
            title: "End date",
            field: "endDate",
            type: "date",
            render: (rowData) => {
              return moment(new Date(rowData.endDate)).format("DD MMM YYYY");
            },
          },
          { title: "Role", field: "role" },
          { title: "Hrs", field: "claimHrs", cellStyle: { width: 10 } },
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
        ]}
        data={resourceData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit Resource",
            onClick: (event, rowData) => {
              callResourceData(rowData);
            },
          },
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          grouping: true,
          exportAllData: true,
         exportButton: true ,
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
