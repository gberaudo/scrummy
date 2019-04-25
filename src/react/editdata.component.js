import React, { Component} from "react";

export class EditData extends Component {
  render() {
    const url = new URL(document.location);
    const csvUrl = url.searchParams.get('csv');
    return (
      <div><a href={csvUrl} target="_blank" rel="noopener">Edit data</a></div>
    );
  }
}
