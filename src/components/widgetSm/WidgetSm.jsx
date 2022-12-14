import "./widgetSm.css"; 
import "reactjs-popup/dist/index.css"; 
import MaterialTable from "material-table";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import moment from "moment";

export default function WidgetSm(props) { 
  return (
    <div className="widgetSm">
        <div className="newUsers">
        <h3 className="widgetLgTitle">Locked Months</h3>
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
                  <span>{rowData.isActive ? "Unlocked" : "Locked"}</span> 
                  </div>
              );
            },
          } 
        ]}
        data={props.locksData}
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
    </div>
  );
}
