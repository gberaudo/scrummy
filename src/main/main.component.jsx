import React, { Component} from "react";
import { MainTableComponent } from "./main.table.component.jsx";
import { GlobalHealth } from "./globalHealth.component.jsx";
import { detectIssues } from "./warning.js";
import { Pre } from '../common/pre.component.jsx';



export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.changeProject = this.changeProject.bind(this);
  }

  changeProject(name) {
    this.props.changeProject(name);
  }

  render() {
    return (
      <div>
        <GlobalHealth data={this.props.data}></GlobalHealth>
        <MainTableComponent data={this.props.data} changeProject={this.changeProject}></MainTableComponent>
        <Pre json={detectIssues(this.props.data)}></Pre>
      </div>
    );
  }
}

