import "./accountsForm.css";
import moment from "moment";
import MaterialTable from "material-table";
import { config, subloc, bnd } from "../../util/config";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
let bandOptions;
export default function AccountsForm() {
  const [bandType, setBand] = useState();
  const history = useHistory();
  const historyLocation = useLocation();

  const loadData = historyLocation.state;
  useEffect(() => {
    bandOptions = bnd.bndList.map((item) => (
      <option key={item.key} value={item.name}>
        {item.name}
      </option>
    ));
    if (loadData) {
      setBand(loadData.bandType);
    }
  }, []);

  const changeSetBand = (e) => {
    setBand(e.target.value);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Account</h1>
      <div className="AccountForm">
        <form className="newUserForm">
          <div className="newUserItem">
            <label className="required">Account Name</label>
            <input type="text" />
          </div>
          <div className="newUserItem">
            <label className="required">Start Date</label>
            <input type="date" required />
          </div>
          <div className="newUserItem">
            <label>End Date</label>
            <input type="date" required />
          </div>
          <div className="newUserItem">
            <label>Account Code</label>
            <input type="text" />
          </div>
          <div className="newUserItem">
            <label>Status</label>
            <select>
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </select>
          </div>
          <div>
            <button className="newUserButton">Create</button>
          </div>
        </form>
      </div>
      <div className="newBand">
        <div>
          <label className="required">Band</label>
          <select onChange={changeSetBand} value={bandType}>
            {bandOptions}
          </select>
        </div>
        <div>
          <label className="required">Currency Rate</label>
          <select value="">
            <option>INR</option>
            <option>US Dollar</option>
          </select>
        </div>
        <div>
          <label className="required">Rate Card</label>
          <input />
        </div>
        <div>
          <button className="newUserButton">Add</button>
        </div>
      </div>
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
          {
            title: "Status",
            field: "isActive",
            render: (rowData) => (rowData.isActive ? "Active" : "Disabled"),
          },
          {
            title: "Band",
            field: "claimRate",
            cellStyle: { width: 20 },
          },
          {
            title: "Currency",
            field: "currency",
            cellStyle: {
              width: 20,
            },
          },
        ]}
        actions={[
          {
            icon: "edit",
            iconProps: { fontSize: "small", color: "primary" },
            tooltip: "Edit Resource",
            // onClick: (event, rowData) => {
            //   callAccountsData(rowData);
            // },
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
