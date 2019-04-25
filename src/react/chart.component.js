import React, { PureComponent} from "react";

export class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.chart_ = null;
    this.el;
  }

  componentDidMount() {
    this.createChart_();
  }
  
  createChart_() {
    if (this.props.data) {
      const el = this.el;
      const ctx = el.getContext('2d');
      this.chart_ = this.props.factory(ctx, this.props.data, this.props.select);
    }
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
    if (this.el) {
      this.destroyChart_();
      this.createChart_();
    }
    return (
      <div style={{width: '450px', display: 'inline-block'}}>
        <canvas ref={el => this.el = el}></canvas>
      </div>
    );
  }
}
