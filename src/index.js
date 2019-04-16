import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { getDataFromFramacalc } from "./inputs.js";
import { normalizeData } from "./transforms.js";
import { computeHealthIndicator } from "./indicators.js";

import moment from 'moment';
window.moment = moment;

getDataFromFramacalc('./data.csv').then(data => {
  data = normalizeData(data);
  data.forEach(l => l.Health = computeHealthIndicator(l));
  ReactDOM.render(<App data={data} />, document.getElementById("root"));
});
