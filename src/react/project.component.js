import React, { Component} from "react";
import { ProjectTableComponent } from "./project.table.component";
import {Chart} from './chart.component';
import {createVelocityChart, createPointsChart, createHealthChart, createDaysChart, createFeedbacksChart, createFeedbacksRadarChart, createClientChart} from '../charts/project.charts';
import { Pre } from "./pre.component";

export class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.onLineSelected = this.onLineSelected.bind(this);
    this.state = {
      line: null
    }
    this.data = this.props.data.filter(l => l.Project === this.props.project);
  }

  onLineSelected(line) {
    this.setState(s=> s.line = line);
  }


  render() {
    return (
      <div>
        <Chart data={this.data} factory={createVelocityChart} select={this.onLineSelected}></Chart>
        <Chart data={this.data} factory={createHealthChart} select={this.onLineSelected}></Chart>
        <Chart data={this.data} factory={createClientChart} select={this.onLineSelected}></Chart>
        <br />
        <Chart data={this.data} factory={createDaysChart} select={this.onLineSelected}></Chart>
        <Chart data={this.data} factory={createPointsChart} select={this.onLineSelected}></Chart>
        <Chart data={this.data} factory={createFeedbacksChart} select={this.onLineSelected}></Chart>
        <ProjectTableComponent data={this.data} project={this.props.project} select={this.onLineSelected}></ProjectTableComponent>
        <Pre json={this.state.line}></Pre>
        <div style={{display: 'inline-block', verticalAlign: 'top'}}>
          <Chart data={this.state.line} factory={createFeedbacksRadarChart}></Chart>
        </div>
      </div>
    );
  }
}
