import React, { Component} from "react";

export class Pre extends Component {
  render() {
    return (
      <pre style={{height: 150, overflowY: 'scroll'}}>{JSON.stringify(this.props.json, null, 2)}</pre>
    );
  }
}

