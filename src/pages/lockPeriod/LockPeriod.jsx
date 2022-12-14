import React from "react";
import "../lockPeriod/lockPeriod.css";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import { config } from "../../util/config";
import axios from "axios";
import moment from "moment";

export default function LockPeriod(props) {
  //   const useHistory = useHistory();
  const arrayData = [];
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [checked, setChecked] = useState();
  const [locksData, setLocksData] = useState([]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const changeMonth = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };
  useEffect(() => {
    props.setBackDrop(true);
    const url = `${config.apiURL}/getLocks`;
    axios.get(url).then((json) => {
      setLocksData(json.data);
      props.setBackDrop(false);
    });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    let url = `${config.apiURL}/createLock`;

    let data = {
      monthName: month,
      year: year,
      isActive: checked ? true : false,
      resourceId: "61d429c11ac04bef63d7a093",
    };

    if (!data.monthName || data.monthName == "0") {
      return toast.warn("Please select month.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    if (!data.year || data.year === "0") {
      return toast.warn("Please select year.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    let fetchData = locksData.filter(
      (item) => item.monthName === data.monthName && item.year === data.year
    );
    if (fetchData.length > 0) {
      url = `${config.apiURL}/updateLock/${fetchData[0]["_id"]}`;
    }
    axios
      .post(`${url}`, data)
      .then((result) => {
        if (result.status === 202 || result.status === 200) {
          const url = `${config.apiURL}/getLocks`;
          axios.get(url).then((json) => setLocksData(json.data));
        }
      })
      .catch((err) => {
        toast.warn("The locking month has already been created.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      });
    const clearState = () => {
      setMonth("0");
      setYear("0");
      setChecked("false");
    };
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle"></h1>
      <form className="newUserForm" onSubmit={submitHandler}>
        <Container>
          <Row>
            <Col>
              {/* <div className="newUserItem"> */}
              <label className="required">Year</label>

              <select value={year} onChange={changeYear}>
                <option value="0"></option>
                <option value={new Date().getFullYear() - 1}>
                  {new Date().getFullYear() - 1}
                </option>
                <option value={new Date().getFullYear()}>
                  {new Date().getFullYear()}
                </option>
                <option value={new Date().getFullYear() + 1}>
                  {new Date().getFullYear() + 1}
                </option>
              </select>
              {/* </div> */}
            </Col>

            <Col>
              {/* <div className="newUserItem"> */}
              <label className="required">Month</label>

              <select value={month} onChange={changeMonth}>
                <option value="0"></option>

                {!(
                  new Date(year).getFullYear() ===
                  new Date().getFullYear() - 1
                ) && (
                  <>
                    <option value="Jan">January</option>
                    <option value="Feb">February</option>
                    <option value="Mar">March</option>
                    <option value="Apr">April</option>
                    <option value="May">May</option>
                    <option value="Jun">June</option>
                    <option value="Jul">July</option>
                    <option value="Aug">August</option>
                    <option value="Sep">September</option>
                  </>
                )}
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
              {/* </div> */}
            </Col>

            <Col>
              {/* <div className="newUserItem"> */}
              <label>Lock</label>
              {/* <select>
            <option value="0"></option>
            <option value="8">enabled</option>
            <option value="9">disabled</option>
          </select> */}
              <Switch
                color="primary"
                checked={checked}
                onChange={handleChange}
                name="checked"
                value={checked}
              />
              {/* </div> */}
            </Col>
          </Row>

          {/* <div className="footer"> */}
          <br />
          <Row>
            <Col>
              <button className="newUserButton" type="submit">
                Submit
              </button>
            </Col>
          </Row>
          {/* </div> */}
        </Container>
      </form>
      <br></br>
      <MaterialTable
        title="Locked Month"
        columns={[
          { title: "Month", field: "monthName" },
          { title: "Year", field: "year" },
          {
            title: "Status",
            field: "isActive",
            render: (rowData) => {
              return (
                <div class={rowData.isActive ? "isActive" : "isDisabled"}>
                  <span>{rowData.isActive ? "Locked" : "Unlocked"}</span>
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
        data={locksData}
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
