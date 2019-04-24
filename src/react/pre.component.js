import React, { Component} from "react";

export class Pre extends Component {
  render() {
    let str = "";
    const json = this.props.json || {};
    for (let key in json) {
      str += `${key}: ${JSON.stringify(json[key])}\n`;
    }
    return (
      <pre style={{width: '300px', display: 'inline-block'}}>{str}</pre>
    );
  }
}
