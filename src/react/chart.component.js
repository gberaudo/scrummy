import React, {Component} from "react";
import ChartJs from 'chart.js';


export class Chart extends Component {
  constructor(props) {
    super(props);
    this.chart_ = null;
    this.el;
  }

  componentDidMount() {
    this.createChart_();
  }
  
  shouldComponentUpdate(newProps, _) {
    if (['data', 'select', 'factory'].some(key => newProps[key] !== this.props[key])) {
      // Update chart
      const newSpec = newProps.factory(newProps.data, newProps.select);
      const chart = this.chart_;
      chart.data = newSpec.data;
      chart.update();
    }
    return false;
  }

  createChart_() {
    const el = this.el;
    const ctx = el.getContext('2d');
    const spec = this.props.factory(this.props.data, this.props.select);
    this.chart_ = new ChartJs(ctx, spec);
  }

  destroyChart_() {
    if (this.chart_) {
      this.chart_.destroy();
      this.chart_ = null;
    }
  }

  componentWillUnmount() {
    this.chart_.destroy();
  }

  render() {
    return (
      <div style={{width: '450px', display: 'inline-block'}}>
        <canvas ref={el => this.el = el}></canvas>
      </div>
    );
  }
}
