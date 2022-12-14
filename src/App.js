import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import ResourceList from "./pages/resourceList/ResourceList"; 
import Resource from "./pages/resource/Resource";
import Leaves from "./pages/leaves/Leaves";
import LeaveForm from "./pages/leaveForm/LeaveForm";
import EventCalendar from './pages/Calendar/EventCalendar';
import HolidayList from "./pages/holidayList/HolidayList";
import Roles from "./pages/roles/Roles";
import Locations from "./pages/locations/Locations";
import TypesLeave from "./pages/typesLeave/TypesLeave";
import { useEffect, useState } from "react";
import Backdrop from "./components/backdrop/Backdrop";
import ForecastReport from "./pages/forecastReport/ForecastReport"; 
import "react-datepicker/dist/react-datepicker.css";
import LocationChart from "./components/locationChart/LocationChart"
import Login from "./pages/login/Login";
import PrivateRoute from "./util/Route/PrivateRoute";
import PublicRoute from "./util/Route/PublicRoute"; 
import LockPeriod from "./pages/lockPeriod/LockPeriod";
import NotificationPage from "./pages/notification/notification";

import AccountsForm from "./pages/accountsForm/AccountsForm";
import Accounts from "./pages/accounts/Accounts";
import HolidayForm from "./pages/holidayForm/HolidayForm";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showBackdrop, setShowShowBackDrop] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const menuClickHandler = () => {
    setShowMenu(!showMenu);
  }
  let backdrop;
  const setLoginUser = (value) => {
    setIsLogged(value);
  }
  useEffect(() => {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLogged(isLoggedIn)
  });
  if (showMenu) {
    backdrop = <Backdrop showMenuHandler={menuClickHandler} />;
  }
  if (showBackdrop) { 
    backdrop = <Backdrop showMenuHandler={menuClickHandler} />;
  }
  return (
    <Router>
      {isLogged &&<Topbar showMenuHandler={menuClickHandler} />}
      <div className="container">
        <Sidebar show={showMenu} showMenuHandler={menuClickHandler} />
        {backdrop}
        <Switch>
          <PrivateRoute restricted={true} exact path="/login">
            {!isLogged && <Login setBackDrop={setShowShowBackDrop} title="Dashboard"  setLoginUser={setLoginUser} />}
            {isLogged && <Redirect to='/' />}
          </PrivateRoute>
          <PrivateRoute restricted={true} exact path="/" component={Home} >  
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/dashboard" title="Dashboard" component={Home}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/resourceList" setBackDrop={setShowShowBackDrop} title="Resources" component={ResourceList}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/resource/:_id" setBackDrop={setShowShowBackDrop} title="Resources" component={Resource}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/resource" setBackDrop={setShowShowBackDrop} title="Resoures"  component={Resource} > 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/leaves" setBackDrop={setShowShowBackDrop} title="Leaves" component={Leaves}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/leaveForm" title="Leaves" component={LeaveForm}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/Calendar" setBackDrop={setShowShowBackDrop}  title="Calendar" component={EventCalendar}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/holidayList" setBackDrop={setShowShowBackDrop} title="Holidays" component={HolidayList}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/roles" setBackDrop={setShowShowBackDrop} title="Roles" component={Roles}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/forecastReport" setBackDrop={setShowShowBackDrop}  title="Forecast Report" component={ForecastReport}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/locations" setBackDrop={setShowShowBackDrop} title="Locations" component={Locations}> 
         </PrivateRoute>
          <PrivateRoute restricted={true} path="/typesLeave"  setBackDrop={setShowShowBackDrop} title="Leave Types" component={TypesLeave}> 
         </PrivateRoute>
         <PrivateRoute restricted={true} path="/lockPeriod"  setBackDrop={setShowShowBackDrop} title="Lock Period" component={LockPeriod}> 
         </PrivateRoute>
        <PrivateRoute restricted={true} path="/locationChart" title="Location Chart" component={LocationChart}> 
          </PrivateRoute>
          <PrivateRoute restricted={true} path="/notification"  title="Notifications" component={NotificationPage}> 
         </PrivateRoute>
        <PrivateRoute restricted={true} path="/accounts" setBackDrop={setShowShowBackDrop} title="Accounts" component={Accounts}> 
        </PrivateRoute>
        <PrivateRoute restricted={true} path="/accountsForm" setBackDrop={setShowShowBackDrop} title="Accounts Form" component={AccountsForm}> 
        </PrivateRoute>
        <PrivateRoute restricted={true} path="/holidayForm" setBackDrop={setShowShowBackDrop} title="Holiday Form" component={HolidayForm}> 
        </PrivateRoute>
        <PrivateRoute restricted={true} path="*"><Redirect to='/'></Redirect> 
        </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
