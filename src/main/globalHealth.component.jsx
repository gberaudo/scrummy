import React, { Component} from "react";
import { computeGlobalHealthIndicator } from "../indicators";
import { Score } from "./score.component.jsx";

export class GlobalHealth extends Component {
  constructor(props) {
    super(props);
    this.globalHealth = computeGlobalHealthIndicator(this.props.data);
  }

  render() {
    return (
      <div>
        <span>Projects health</span>
        <Score value={this.globalHealth}></Score>
      </div>
    );
  }
}
