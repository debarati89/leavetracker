import "./holidayForm.css";
import axios from "axios";
import { config, subloc } from "../../util/config";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getSortOrder, getHolidayCountValidation } from "../../util/utility";
import { toast } from "react-toastify";
import moment from "moment";


//const Cryptr = require("cryptr");
//const cryptr = new Cryptr("myTotalySecretKey");

toast.configure();
let leaveTypeOptions;
let resourceOptions;
let locationOptions;
let subLocationOptions;
let LeaveLookup = [];

export default function HolidayForm(props) {

  const history = useHistory();
  const historyLocation = useLocation();
  const loadData = historyLocation.state;

  const [resourceId, setResourceId] = useState(loadData && loadData.name);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState();
  const [sublocation, setSubLocation] = useState();
  const [createdOn, setCreatedOn] = useState();
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState();

  const params = useParams();
  const title = loadData && loadData.name ? "Edit Holiday" : "New Holiday";
  console.log("state", loadData);

  useEffect(() => {
    const url = `${config.apiURL}/getLevesLookup`
    axios.get(url).then((json) => {
      LeaveLookup = json.data
      const sessionData = sessionStorage.getItem("user");
      if (!sessionData) {
        history.push("/");
      } else {
        let data = JSON.parse(sessionData);
        data.locations.push({ locationNameValue: "0", locationName: "" });
        data.locations.sort(getSortOrder("locationName"));
        locationOptions = data.locations.map((item) => (
          <option key={item.locationValue} value={item.locationValue}>
            {item.locationName}
          </option>
        ));
        subLocationOptions = subloc.stateList.map((item) => (
          <option key={item.key} value={item.name}>
            {item.name}
          </option>
        ));
        if (loadData) {
          setLocation(loadData.location);
          setSubLocation(loadData.sublocation);
          setResourceId(loadData.resourceId);
          setStartDate(
            loadData.startDate &&
            moment(new Date(loadData.startDate)).format("YYYY-MM-DD")
          );
          setEndDate(
            loadData.endDate &&
            moment(new Date(loadData.endDate)).format("YYYY-MM-DD")
          );
          setReason(loadData.reason);
        }
        setShowForm(true);
      }
    }
    );
  }, []);

  const changeResource = (e) => {
    setResourceId(e.target.value);
  };
  const changeStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const changeSetLocation = (e) => {
    setLocation(e.target.value);
  };
  const changeSetSubLocation = (e) => {
    setSubLocation(e.target.value);
  };


  const onSubmitRequest = (e) => {
    e.preventDefault();

    let resourceData = LeaveLookup['resources'].filter(
      (item) => item._id === resourceId
    )[0];
    const havingHoliday = getHolidayCountValidation(LeaveLookup['holidays'], resourceData, startDate, endDate);
    if (havingHoliday) {
      toast.warn(`You have an holoday on ${havingHoliday['holidayDetails']}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    if (!reason || reason.trim().lenght === 0) {
      toast.warn(`Please enter reason.`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return
    }
    let startMonthName = moment(startDate).format('MMMM').substring(0, 3);
    let endMonthName = moment(endDate).format('MMMM').substring(0, 3);
    let startYear = moment(startDate).format('YYYY');
    let endYear = moment(endDate).format('YYYY');


    let findStartMonthLocks = LeaveLookup['locksMonth'].filter(item =>
      ((item.monthName === startMonthName && item.year == startYear)
      ) && item.isActive === true
    );
    let findEndMonthLocks = LeaveLookup['locksMonth'].filter(item =>
      ((item.monthName === endMonthName && item.year == endYear)
      ) && item.isActive === true
    );
    if (findStartMonthLocks.length > 0 || findEndMonthLocks.length > 0) {
      return toast.warn(`This period is closed, you cannot apply for leave, please connect with the manager.`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    const reqData = {
      resourceId: resourceId,
      name: resourceData["name"],
      startDate: startDate,
      endDate: endDate,

      reason: reason
    };
    const url =
      loadData && loadData._id ? `/updateLeave/${loadData._id}` : `/applyLeave`;
    //const url = `/applyLeave`;
    axios
      .post(`${config.apiURL}${url}`, reqData)
      .then((result) => {
        if (result.status === 202 || result.status === 200) {
          clearState();
          history.push("/leaves");
        }
      })
      .catch((err) => {
        toast.warn(`You have already applied for leave for that days.`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

      });
  };

  const clearState = () => {
    setResourceId("");
    setStartDate("");
    setEndDate("");

  };
  if (!showForm) {
    return (
      <div className="newUser loaderClass">
        <Spinner animation="grow" />
      </div>
    );
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">{title}</h1>
        <form className="newUserForm" onSubmit={onSubmitRequest}>
          <div className="newUserItem">
            <label className="required">Holiday Name</label>
            <input type="text" />
          </div>
          <div className="newUserItem">
            <label className="required">Date</label>
            <input
              type="date"
              value={startDate}
              min={moment(new Date()).format("YYYY-MM-DD")}
              onChange={changeStartDate}
              disabledDays={[
                new Date(2021, 1, 12),
                new Date(2021, 1, 2)
              ]}
            />
          </div>
          <div className="newUserItem">
          <label className="required">Location</label>
          <select onChange={changeSetLocation} value={location}>
            {locationOptions}
          </select>
        </div>
        {location === 'India' ?
        
        <div className="newUserItem">
          <label className="required">Sub-Location</label>
          <select onChange={changeSetSubLocation} value={sublocation}>
            {subLocationOptions}
          </select>
        </div> : <div></div>}
          <div className="newUserItem">
            <label>Status</label>
            <select>
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </select>
          </div>
          <div className="footer">
            <button className="newUserButton" type="submit" >
              Submit
            </button>
            <button
              className="cancelButton"
              type="cancel"
              onClick={() => {
                history.push("/holidayList");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
    </div>
  );
}
