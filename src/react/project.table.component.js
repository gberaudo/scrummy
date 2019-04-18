import React, { Component} from "react";
import { createProjectTable } from "../tables/project.tables";


export class ProjectTableComponent extends Component {
  componentDidMount() {
    const el = this.el;
    const project = this.props.project;
    const projectData = this.props.data.filter(l => l.Project === project);
    const onLineSelected = this.props.select;
    this.table = createProjectTable(el, projectData, onLineSelected);
  }
  
  componentWillUnmount() {
    this.table.destroy();
  }

  render() {
    return (
      <div>
        <div ref={el => this.el = el}></div>
      </div>
    );
  }
}
