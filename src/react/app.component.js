import React, { Component} from "react";
import { MainPage } from "./main.component";
import { ProjectPage } from "./project.component";
import { GlobalHealth } from "./globalHealth.component";
import { EditData } from "./editdata.component";


export class AppPage extends Component {
  constructor(props) {
    super(props);
    this.onProjectChange = this.onProjectChange.bind(this);
    
    this.state = {
      project: this.getProjectFromUrl(),
      data: props.data
    };
  }

  getProjectFromUrl() {
    const url = new URL(document.location);
    return url.searchParams.get('project');
  }
  
  onProjectChange(name) {
    this.setState({
      project: name
    });
  }

  render() {
    if (this.state.project) {
      return (
        <div className="App">
          <a href="/">Display global data</a>
          <EditData></EditData>
          <ProjectPage project={this.state.project} data={this.state.data}></ProjectPage>
        </div>
      );
    } else {
      return (
        <div className="App">
          <EditData></EditData>
          <GlobalHealth data={this.state.data}></GlobalHealth>
          <MainPage changeProject={this.onProjectChange} data={this.state.data}></MainPage>
        </div>
      );
    }
  }
}
