import React, { PureComponent} from "react";
import { createProjectTable } from "../tables/project.tables";


export class ProjectTableComponent extends PureComponent {
  componentDidMount() {
    const el = this.el;
    const data = this.props.data;
    const onLineSelected = this.props.select;
    this.table = createProjectTable(el, data, onLineSelected);
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
