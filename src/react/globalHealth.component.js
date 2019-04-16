import React, { Component} from "react";
import { computeGlobalHealthIndicator } from "../indicators";
import { Score } from "./score.component";

export class GlobalHealth extends Component {
  constructor(props) {
    super(props);
    this.globalHealth = computeGlobalHealthIndicator(this.props.data);
  }

  render() {
    return (
      <div>
        <span>C2C projects health</span>
        <Score value={this.globalHealth}></Score>
      </div>
    );
  }
}
