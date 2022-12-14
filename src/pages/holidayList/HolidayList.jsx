import "./holidayList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../util/config";
import MaterialTable from "material-table";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

export default function HolidayList(props) {
  const url = `${config.apiURL}/getHolidays`;
  const history = useHistory();

  const [holidayData, setHolidayData] = useState([]);

  useEffect(() => {
    props.setBackDrop(true);
    axios.get(url).then((json) => {
      setHolidayData(json.data);
      props.setBackDrop(false);
    });
  }, []);
  const handleClickRow = (event, data) => {
    debugger;
  };
  const callholidayData = (data) => {
    history.push({
      pathname: `/holidayList/${data._id}`,
      state: data,
    });
  };
  return (
    <div class="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Holiday List</h1>
        <Link to="/holidayForm">
          <button className="userAddButton">
            Create New
          </button>
        </Link>
      </div>
      <br />

      <MaterialTable
        title="Holidays"
        columns={[
          { title: "Name", field: "name" },
          { title: "Location", field: "location" },
          {
            title: "Holiday On",
            field: "startDate",
            type: "date",
            render: (rowData) => {
              return moment(new Date(rowData.startDate)).format("DD MMM YYYY");
            },
          },
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
        data={holidayData}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit Holiday",
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
