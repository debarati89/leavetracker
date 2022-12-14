// import "./locationChart.css";
import React, { Component } from "react";
import Chart from "react-apexcharts";
let monthObj = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}
class LocationChart extends Component {
  getLeaveData = (data, type) => {
    let clArray = [];
    let leaveData = data.filter(item => item.leaveType === type);
    for (let month in monthObj) {
      clArray.push(leaveData.filter(item =>
        new Date(item.startDate).getMonth() + 1 === monthObj[month] || new Date(item.endDate).getMonth() + 1 === monthObj[month]).length)
    }
    return clArray;
  }
  constructor(props) {
    super(props);
    
    this.state = {
      series: [
        {
          name: "Casual Leave",
          data: this.getLeaveData(this.props.dashbaordData,'CL'),
        },
        {
          name: "Privilege Leave",
          data: this.getLeaveData(this.props.dashbaordData,'PL')
        },
        {
          name: "Sick Leave",
          data: this.getLeaveData(this.props.dashbaordData,'Sick')
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 400,
          width: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: Object.keys(monthObj),
        },
        yaxis: {
          title: {
            text: "Leaves",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val + " Leave";
            },
          },
        },
      },
    };
  }
  render() { 
    return (
      <div className="chartL">
        <div className="currentWeek">Applied Leaves</div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={300}
          width={500}
        />
      </div>
    );
  }
}
export default LocationChart;
