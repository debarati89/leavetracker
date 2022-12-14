import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {
  faUsers,
  faLaptop,
  faPhone,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faUsers, faLaptop, faPhone, faHome);

export default function FeaturedInfo(props) { 
  let totalResource = props.dashbaordData.resources.length || 0;
  let activeResource = props.dashbaordData.resources.filter(item => item.isActive === true).length;
  let totaLeaveInYear = props.dashbaordData.leaves.filter(item =>
    new Date(item.startDate).getFullYear() === new Date().getFullYear() || new Date(item.endDate).getFullYear() === new Date().getFullYear()).length;
  let currentMonthLeaves = props.dashbaordData.leaves.filter(item =>
    new Date(item.startDate).getMonth() === new Date().getMonth() || new Date(item.endDate).getMonth() === new Date().getMonth()).length;
  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"users"} />
        </div>
        <div>
          <span className="featuredTitle">Total Resources</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{ totalResource}</span>
          </div>
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"laptop"} />
        </div>
        <div>
          <span className="featuredTitle">Active Resource</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{activeResource}</span>
          </div>
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"phone"} />
        </div>
        <div>
          <span className="featuredTitle">Current Month Leaves</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{currentMonthLeaves}</span>
          </div>
        </div>
      </div>
      <div className="featuredItem">
        <div className="featuredIcons">
          <FontAwesomeIcon icon={"home"} />
        </div>
        <div>
          <span className="featuredTitle">Leave In Year {new Date().getFullYear() }</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{totaLeaveInYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
