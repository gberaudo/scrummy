import React, { Component} from "react";
import { ProjectTableComponent } from "./project.table.component.jsx";
import {Chart} from '../common/chart.component.jsx';
import {createVelocityChart, createPointsChart, createHealthChart, createDaysChart, createFeedbacksChart, createFeedbacksRadarChart, createClientChart} from './project.charts';
import { Pre } from "../common/pre.component.jsx";

export class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.onLineSelected = this.onLineSelected.bind(this);
    this.projectData = this.props.data.filter(l => l.Project === this.props.project);

    this.state = {
      line: null,
      data: this.projectData
    };
  }

  onLineSelected(line) {
    this.setState(s => ({line}));
  }

  filterDataOnDate(days) {
    this.setState(s => {
      const from = moment().add(days, 'days');
      return {data: this.projectData.filter(l => moment(l.To).isAfter(from))};
    });
  }

  render() {
    const jiraUrlPrefix = `https://jira.camptocamp.com/secure/RapidBoard.jspa?rapidView=${this.projectData[0].JiraProject}`;
    const details = this.state.line ? (
      <>
        <Pre json={this.state.line}></Pre>
        <div style={{display: 'inline-block', verticalAlign: 'top'}}>
          <Chart data={this.state.line} factory={createFeedbacksRadarChart}></Chart>
        </div>
        <div>
          <span>Jira&nbsp;
          <a href={`${jiraUrlPrefix}&view=reporting&chart=sprintRetrospective&sprint=${this.state.line['JiraSprint']}`} target="_blank" rel="noopener">Sprint</a>&nbsp;
          <a href={`${jiraUrlPrefix}&view=reporting&chart=burndownChart&sprint=${this.state.line['JiraSprint']}`} target="_blank" rel="noopener">Burndown</a>
          </span>
        </div>
      </>
    ) : (
      <></>
    )
    const data = this.state.data;
    return (
      <div>
        <a href={`${jiraUrlPrefix}&view=reporting&chart=controlChart`} target="_blank" rel="noopener">Jira control chart</a>
        <br />
        <button onClick={() => this.filterDataOnDate(-1000)}>forever</button>
        <button onClick={() => this.filterDataOnDate(-200)}>last 200 days</button>
        <button onClick={() => this.filterDataOnDate(-100)}>last 100 days</button>
        <button onClick={() => this.filterDataOnDate(-50)}>last 50 days</button>
        <br />
        <Chart data={data} factory={createVelocityChart} select={this.onLineSelected}></Chart>
        <Chart data={data} factory={createHealthChart} select={this.onLineSelected}></Chart>
        <Chart data={data} factory={createClientChart} select={this.onLineSelected}></Chart>
        <br />
        <Chart data={data} factory={createDaysChart} select={this.onLineSelected}></Chart>
        <Chart data={data} factory={createPointsChart} select={this.onLineSelected}></Chart>
        <Chart data={data} factory={createFeedbacksChart} select={this.onLineSelected}></Chart>
        <ProjectTableComponent data={data} select={this.onLineSelected}></ProjectTableComponent>
        {details}
      </div>
    );
  }
}
