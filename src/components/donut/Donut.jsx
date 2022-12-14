import React, { Component } from "react";
import Chart from "react-apexcharts";
import "../donut/Donut.css";
class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [0, 0, 0, 1, 1],
      colors: ["#F44336", "#E91E63", "#F44336", "#E91E63", "#9C27B0"],
      labels: ["jan", "feb", "mar", "apr", "may"],
    };
  }

  render() {
    return (
      <div className="donut">
        <div class="donutTitle">Lock Period for the current month</div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="500"
        />
      </div>
    );
  }
}

export default Donut;
