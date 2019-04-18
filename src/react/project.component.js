import React, { Component} from "react";
import { ProjectTableComponent } from "./project.table.component";
import {Chart} from './chart.component';
import {createVelocityChart, createTotalChart, createHealthChart} from '../charts/project.charts';
import { Pre } from "./pre.component";

export class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.onLineSelected = this.onLineSelected.bind(this);
    this.state = {
      line: null
    }
  }

  onLineSelected(line) {
    this.setState(s=> s.line = line);
  }


  render() {
    return (
      <div>
        <Chart data={this.props.data} factory={createVelocityChart} select={this.onLineSelected}></Chart>
        <Chart data={this.props.data} factory={createTotalChart} select={this.onLineSelected}></Chart>
        <Chart data={this.props.data} factory={createHealthChart} select={this.onLineSelected}></Chart>
        <ProjectTableComponent data={this.props.data} project={this.props.project} select={this.onLineSelected}></ProjectTableComponent>
        <Pre json={this.state.line}></Pre>
      </div>
    );
  }
}
