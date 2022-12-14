import "../pieChart/PieChart.css";
import React, { Component } from "react";
import Chart from "react-apexcharts";
class PieChart extends React.Component {
   getDashboardData = (data)=> { 
     let locations = [];
     let series = [];
    data.forEach(element => {
      if (!locations.includes(element.location)) { 
        locations.push(element.location);
       series.push(data.filter(item => item.location === element.location).length);
      }
    }); 
     return {
       locations,
       series
     };
  }
  constructor(props) {
    super(props); 
    let { locations, series } = this.getDashboardData(props.dashbaordData);
    this.state = {
      series: series,
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        legend: {
          position: "bottom",
        },
        labels: locations,
        responsive: [
          {
            breakpoint: 100,
            options: {
              chart: {
                width: 300,
              },
             
            },
          },
        ],
      },
    };
  }
  render() {
    return (
      <div id="chartPie">
        <div className="currentWeek">Global Presence of {this.props.dashbaordData.length } Resources</div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={450}
        />
      
      </div>
    );
  }
}
export default PieChart;
