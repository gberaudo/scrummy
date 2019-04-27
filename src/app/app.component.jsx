import React, { Component} from "react";
import { MainPage } from "../main/main.component.jsx";
import { ProjectPage } from "../project/project.component.jsx";
import { EditData } from "./editdata.component.jsx";


export class AppPage extends Component {
  constructor(props) {
    super(props);
    this.onProjectChange = this.onProjectChange.bind(this);
    const url = new URL(document.location);
    url.searchParams.delete('project');
    this.mainPageUrl = url.toString();
    
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
    let content;
    if (this.state.project) {
      content = (
        <>
          <a href={this.mainPageUrl}>Display global data</a>
          <ProjectPage project={this.state.project} data={this.state.data}></ProjectPage>
        </>
      );
    } else {
      content = (
        <>
          <MainPage changeProject={this.onProjectChange} data={this.state.data}></MainPage>
        </>
      );
    }
    return (
     <React.StrictMode>
        <div className="App">
          <EditData></EditData>
          {content}
        </div>
      </React.StrictMode>
    );
  }
}
