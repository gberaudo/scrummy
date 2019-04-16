import React, { Component} from "react";

export class Chart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const el = this.el;
    const ctx = el.getContext('2d');
    this.chart = this.props.factory(ctx, this.props.data);
  }
  
  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div style={{width: 400, display: 'inline-block'}}>
        <canvas ref={el => this.el = el}></canvas>
      </div>
    );
  }
}