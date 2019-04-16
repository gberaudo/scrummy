import React, { Component} from "react";
import { scoreToFace } from "../indicators";

export class Score extends Component {
  constructor(props) {
    super(props);
    this.face = scoreToFace(this.props.value);
  }

  render() {
    return (
      <div>
        <div style={{fontSize: 2 + 'rem'}}>{this.face} {this.props.value.toFixed(1)}</div>
      </div>
    );
  }
}
