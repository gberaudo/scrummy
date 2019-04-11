import {getData} from './input/framacalc';
import {createLineChart} from './chart/chart';
import Tabulator from 'tabulator-tables';
import moment from 'moment';
window.moment = moment;

function component(value) {
  let element = document.createElement('pre');

  element.innerHTML = JSON.stringify(Object.keys(value[0])) + '<br>' + JSON.stringify(value[0], null, 2);

  return element;
}

function parseSerialNumberDate(numberDate, timezoneOffset) {
  return new Date(Date.UTC(0, 0, numberDate, 0, timezoneOffset));
}

function createTable(tabledata) {

  var table = new Tabulator("#table", {
    groupBy:"Project",
    height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: tabledata, //assign data to table
    layout:"fitColumns", //fit columns to width of table (optional)
    dataFiltered(filters, rows) {
      const datasets = createDataSets(rows.map(r => r.getData()));
      chart.data.datasets.length = 0;
      chart.data.datasets.push(...datasets);
      chart.update();
    },
    columns:[ //Define Table Columns
      {title:"Project", field:"Project", width:150, headerFilter:true, headerFilterPlaceholder:"filter data...",},
      {title:"Sprint", field:"Sprint"},
      {title:"To", field:"To", sorter:"date", align:"center", formatter:"datetime", formatterParams:{
        outputFormat:"DD/MM/YYYY",
        invalidPlaceholder:"(invalid date)",
      }},
      {title:"Velocity", field:"Velocity"},
      {title:"Delivered", field:"Delivered"},
      {title:"Total", field:"Total"},
    ],
 });
 table.setHeaderFilterFocus("Project");
}

function createDataSets(data) {
  return [{
    yAxisID: 'y-axis-velocity',
    fill: false,
    label: 'Velocity',
    borderColor: 'rgb(54, 162, 235)',
    data: data.map(l => l.Velocity).reverse()
  }, {
    yAxisID: 'y-axis-points-days',
    fill: false,
    label: 'Done',
    borderColor: 'rgb(12, 12, 235)',
    data: data.map(l => l.Done).reverse()
  },
  {
    yAxisID: 'y-axis-points-days',
    fill: false,
    label: 'PLanned',
    borderColor: 'rgb(12, 12, 35)',
    data: data.map(l => l.Planned).reverse()
  }];
}
let chart;
// 
getData('./data.csv').then(data => {
  const timezoneOffset = new Date().getTimezoneOffset();
  data.forEach(entry => {
    entry.From = parseSerialNumberDate(entry.From, timezoneOffset);
    entry.To = parseSerialNumberDate(entry.To, timezoneOffset);
  });
  document.body.appendChild(component(data));
  var ctx = document.getElementById('chart').getContext('2d');
  const labels = data.map(l => l.Sprint).reverse()
  const datasets = createDataSets(data);
  chart = createLineChart(ctx, labels, datasets);
  window.chart = chart;
  createTable(data);
});

