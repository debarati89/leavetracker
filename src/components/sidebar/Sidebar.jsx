import "./sidebar.css";
import {
  Timeline,
  PermIdentity,
  BarChart,
  DynamicFeed,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DateRangeIcon from "@material-ui/icons/DateRange";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LockIcon from "@material-ui/icons/Lock";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Person from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar(props) {
  let drawerClasses = "sidebar side-drawer";
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(sessionStorage.getItem("isAdmin") == "true" ? true : false);
  });
  if (props.show) {
    drawerClasses = "sidebar side-drawer open";
  }
  return (
    <div className={drawerClasses} onClick={props.showMenuHandler}>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/dashboard" className="link">
              <li className="sidebarListItem">
                <DashboardIcon className="sidebarIcon" />
                Home
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/resourceList" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Resources
              </li>
            </NavLink>
            <NavLink to="/leaves" className="link">
              <li className="sidebarListItem">
                <ExitToAppIcon className="sidebarIcon" />
                Leaves
              </li>
            </NavLink>
            <NavLink to="/calendar" className="link">
              <li className="sidebarListItem">
                <DateRangeIcon className="sidebarIcon" />
                Calendar
              </li>
            </NavLink>
            <NavLink to="/forecastReport" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Forecast Report
              </li>
            </NavLink>
            <NavLink to="/notification" className="link">
              <li className="sidebarListItem">
                <NotificationsIcon className="sidebarIcon" />
                Notifications
              </li>
            </NavLink>
            <NavLink to="/accounts" className="link">
              <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                Accounts
              </li>
            </NavLink>
          </ul>
        </div>

        {isAdmin && (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Admin Configurations</h3>
            <ul className="sidebarList">
              <NavLink to="/roles" className="link">
                <li className="sidebarListItem">
                  <AssignmentIndIcon className="sidebarIcon" />
                  Roles
                </li>
              </NavLink>
              <NavLink to="/typesLeave" className="link">
                <li className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon" />
                  Leave Types
                </li>
              </NavLink>
              <NavLink to="/locations" className="link">
                <li className="sidebarListItem">
                  <PersonPinCircleIcon className="sidebarIcon" />
                  Locations
                </li>
              </NavLink>
              <NavLink to="/holidayList" className="link">
                <li className="sidebarListItem">
                  <ListAltIcon className="sidebarIcon" />
                  Holiday List
                </li>
              </NavLink>
              <NavLink to="/lockPeriod" className="link">
                <li className="sidebarListItem">
                  <LockIcon className="sidebarIcon" />
                  Lock Period
                </li>
              </NavLink>
            </ul>
          </div>
        )}
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <NavLink to="/locationChart" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Location Chart
              </li>
            </NavLink>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
