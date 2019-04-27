import React, { Component} from "react";
import { createMainTable } from "./main.tables.js";


export class MainTableComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const el = this.el;
    const onRowClicked = this.onRowClicked.bind(this);
    this.table = createMainTable(el, this.props.data, onRowClicked);
  }
  
  componentWillUnmount() {
    this.table.destroy();
  }

  onRowClicked(line) {
    this.props.changeProject(line.Project);
  }

  render() {
    return (
      <div>
        <div ref={el => this.el = el}></div>
      </div>
    );
  }
}
