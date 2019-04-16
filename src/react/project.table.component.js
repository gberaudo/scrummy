import React, { Component} from "react";
import { createProjectTable } from "../tables/project.tables";


export class ProjectTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: null
    };
  }

  componentDidMount() {
    const el = this.el;
    const onRowClicked = this.onRowClicked.bind(this);
    const project = this.props.project;
    const projectData = this.props.data.filter(l => l.Project === project);
    this.table = createProjectTable(el, projectData, onRowClicked);
  }
  
  componentWillUnmount() {
    this.table.destroy();
  }

  onRowClicked(line) {
    // FIXME: this should be moved up
    this.setState(s => s.line = line);
  }

  render() {
    return (
      <div>
        <div ref={el => this.el = el}></div>
        <pre style={{height: 150, overflowY: 'scroll'}}>{JSON.stringify(this.state.line, null, 2)}</pre>
      </div>
    );
  }
}
