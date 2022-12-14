import MaterialTable from "material-table";
import moment from "moment";
import "./widgetLg.css";
const leaveDetails = {
  "CL": "Casual Leave", // just for example, remove it if you don't need
  "PL": "Privilege Leave",
  "Sick": "Sick Leave",
};
export default function WidgetLg(props) {
  let data = props.data.leaves; 
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Leave Transactions</h3>
      <MaterialTable
        title="Leave Summary"
        columns={[
          { title: 'Name', field: 'name', cellStyle: { width: 200 } },
          {
            title: 'From', field: 'startDate', type: 'date',cellStyle: { width: 150 }, render: rowData => {
              return moment(new Date(rowData.startDate)).format('DD MMM YYYY')
            }
          },
          {
            title: 'To', field: 'endDate', type: 'date',cellStyle: { width: 150 }, render: rowData => {
              return moment(new Date(rowData.endDate)).format('DD MMM YYYY')
            }
          },
          {
            title: '# Days', field: 'daysDiff', cellStyle: {
              width: 10
            }
          },
          {
            title: 'Leave Type', field: 'leaveType', cellStyle: { width: 20 },
            render: rowData => {
             
              return (
                <div class={rowData.leaveType === 'PL' ? 'pl-leave' : rowData.leaveType === 'CL' ? 'cl-leave'
                  : 'sick-leave'}><span>{leaveDetails[rowData.leaveType]}</span></div>)
            }
          },
          //{ title: 'Reason', field: 'reason', width: "30%" },
          //{ title: 'Status', field: 'isActive', render: rowData => (rowData.isActive ? "Active" : "Disabled") }
        ]}
        data={data} 
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          grouping: true,
          exportAllData: true,
          exportButton: true,
          headerStyle: {
            backgroundColor: 'rgb(39 37 37 / 95%)',
            color: '#fff',
            whiteSpace: 'nowrap'
          },
        }}
      />
    </div>
  );
}
{
  /* <Button type="Declined" /> */
}
