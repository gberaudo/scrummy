import React from 'react'
import App from './App.js'
import ReactDOM from 'react-dom'
import { getDataFromFramacalc, getCSVResource } from './inputs.js'
import { normalizeData } from './transforms.js'
import { computeHealthIndicator } from './indicators.js'

import moment from 'moment'
window.moment = moment

getCSVResource()
  .then(raw => getDataFromFramacalc(raw))
  .then(data => {
    data = normalizeData(data)
    data.forEach(l => (l.Health = computeHealthIndicator(l)))
    ReactDOM.render(<App data={data} />, document.getElementById('root'))
  })
