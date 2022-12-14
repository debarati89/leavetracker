import "./accounts.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../util/config";
import MaterialTable from "material-table";
import { Link, useHistory } from "react-router-dom";
import { getDaysDifference, getSortOrder } from "../../util/utility";
import moment from "moment";
import { toast } from "react-toastify";

export default function Accounts() {
    //const url = `${config.apiURL}/getLeaves`;
    //const history = useHistory();
    //const [name, setName] = useState();
    //const [startDate, setStartDate] = useState( );
    //const [endDate, setEndDate] = useState();
    //const [code, setCode] = useState();
    //const [state, setState] = useState();
    //const [claimRate, setClaimRate] = useState();
    //const [currency, setCurrency] = useState();
    const history = useHistory();
    const accountsData = [
        {
            name: "Naruto Inc.",
            startDate: "02 May 2021",
            endDate: "11 Dec 2023",
            code: "2681277213",
            claimRate: "9 hours",
            currency: "USD",
        },
        {
            name: "Uchiha Inc.",
            startDate: "02 May 2021",
            endDate: "11 Dec 2023",
            code: "2681277213",
            claimRate: "9 hours",
            currency: "JPY",
        },
        {
            name: "Uzumaki Inc.",
            startDate: "02 May 2021",
            endDate: "11 Dec 2023",
            code: "2681277213",
            claimRate: "9 hours",
            currency: "JPY",
        },
        {
            name: "Saturobi Inc.",
            startDate: "02 May 2021",
            endDate: "11 Dec 2023",
            code: "2681277213",
            claimRate: "9 hours",
            currency: "JPY",
        },
        {
            name: "Hyuga Inc.",
            startDate: "02 May 2021",
            endDate: "11 Dec 2023",
            code: "2681277213",
            claimRate: "9 hours",
            currency: "JPY",
        },


    ];
    {/*useEffect(() => {
    props.setBackDrop(true);

    axios
      .get(url)
      .then((json) => {
        let data = json.data.map((item) => {
          item.daysDiff = getDaysDifference(item.startDate, item.endDate)[
            "difference"
          ];
          return item;
        });
        setLeavesData(data.sort(getSortOrder("name")));
        props.setBackDrop(false);
      })
      .catch((err) => {
        props.setBackDrop(false);
      });
  }, []);

  //const handleClickRow = (event, data) => {
    //debugger;
  //};*/}

    const callAccountsData = (data) => {
        history.push({
            pathname: `/accountsForm`,
            state: data,
        });
    };
    return (
        <div class="userList">
            <div className="userTitleContainer">
                <h1 className="userTitle">Accounts List</h1>
                <Link to="/accountsForm">
                    <button className="userAddButton">Create Account</button>
                </Link>
            </div>
            <br />

            <MaterialTable
                title="Accounts List"
                columns={[
                    { title: "Name", field: "name", cellStyle: { width: 200 } },
                    {
                        title: "Start",
                        field: "startDate",
                        type: "date",
                        cellStyle: { width: 150 },
                        render: (rowData) => {
                            return moment(new Date(rowData.startDate)).format("DD MMM YYYY");
                        },
                    },
                    {
                        title: "End",
                        field: "endDate",
                        type: "date",
                        cellStyle: { width: 150 },
                        render: (rowData) => {
                            return moment(new Date(rowData.endDate)).format("DD MMM YYYY");
                        },
                    },
                    {
                        title: "Code",
                        field: "code",
                        cellStyle: {
                            width: 20,
                        },

                    },
                    { title: 'Status', field: 'isActive', render: rowData => (rowData.isActive ? "Active" : "Disabled") },
                    {
                        title: "Bill Rate/Claim Hours",
                        field: "claimRate",
                        cellStyle: { width: 20 },

                    },
                    {
                        title: "Currency", field: "currency", cellStyle: {
                            width: 20,
                        },
                    },

                ]}
                data={accountsData}
                actions={[
                    {
                        icon: "edit",
                        iconProps: { fontSize: "small", color: "primary" },
                        tooltip: "Edit Resource",
                        onClick: (event, rowData) => {
                            callAccountsData(rowData);
                        },
                    },
                ]}
                options={{
                    sorting: true,
                    actionsColumnIndex: -1,
                    grouping: true,
                    exportAllData: true,
                    exportButton: true,
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