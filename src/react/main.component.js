import React, { Component} from "react";
import { MainTableComponent } from "./main.table.component";


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
        <MainTableComponent data={this.props.data} changeProject={this.changeProject}></MainTableComponent>
      </div>
    );
  }
}

