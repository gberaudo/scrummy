import React, { Component} from "react";
import { ProjectTableComponent } from "./project.table.component";
import {Chart} from './chart.component';
import {createVelocityChart, createTotalChart, createHealthChart} from '../charts/project.charts';

export class ProjectPage extends Component {


  render() {
    return (
      <div>
        <Chart data={this.props.data} factory={createVelocityChart}></Chart>
        <Chart data={this.props.data} factory={createTotalChart}></Chart>
        <Chart data={this.props.data} factory={createHealthChart}></Chart>
        <ProjectTableComponent data={this.props.data} project={this.props.project}></ProjectTableComponent>
      </div>
    );
  }
}
