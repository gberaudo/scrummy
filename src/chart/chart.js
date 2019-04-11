import Chart from 'chart.js';

export function createLineChart(ctx, labels, datasets) {
  return new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
  
    // The data for our dataset
    data: {
        labels,
        datasets
    },
  
    // Configuration options go here
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          id: "y-axis-velocity"
        }, {
          id: "y-axis-points-days"
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
    }
  });
}
