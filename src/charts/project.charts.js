import Chart from 'chart.js';


export function createDataSets(data) {
  return [{
    yAxisID: 'y-axis-velocity',
    fill: false,
    label: 'Velocity',
    borderColor: 'rgb(54, 162, 235)',
    data: data.map(l => l.Velocity).reverse()
  }, {
    yAxisID: 'y-axis-points-days',
    fill: false,
    label: 'Days done',
    borderColor: 'rgb(12, 12, 235)',
    data: data.map(l => l.Done).reverse()
  },
  {
    yAxisID: 'y-axis-points-days',
    fill: false,
    label: 'Delivered story points',
    borderColor: 'rgb(12, 12, 35)',
    data: data.map(l => l.Delivered).reverse()
  }];
}

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
          id: "y-axis-velocity",
          ticks: {
              min: 0
          },
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

export function createTemporalLineChart(ctx, labels, datasets) {
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
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              quarter: 'MMM YYYY'
            }
          }
        }],
        yAxes: [{
          id: "y-axis-velocity",
          ticks: {
              min: 0
          },
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

function createVelocityDataset(data) {
  return {
    fill: false,
    label: 'Velocity',
    borderColor: 'rgb(54, 162, 235)',
    data: data.map(l => l.Velocity).reverse()
  };
}

function createTotalDataset(data) {
  return {
    fill: false,
    label: 'Total',
    borderColor: 'rgb(154, 162, 235)',
    data: data.map(l => l.Total).reverse()
  };
}

function createHealthDataset(data) {
  return {
    fill: false,
    label: 'Health',
    borderColor: 'rgb(54, 262, 235)',
    data: data.map(l => l.Health).reverse()
  };
}

function createOnClickFunction(data, onItemClicked) {
  return function(evt, elements) {
    if (elements.length > 0) {
      const idx = elements[0]._index;
      onItemClicked(data[idx]);
    }
  }
}

function createTimeOptions(onClick) {
  return {
    responsive: true,
    onClick,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            quarter: 'MMM YYYY'
          }
        }
      }]
    },
  };
}

export function createVelocityChart(ctx, data, onItemClicked) {
  const labels = data.map(l => l.To).reverse();
  const datasets = [
    createVelocityDataset(data)
  ];
  const onClick = createOnClickFunction(data, onItemClicked);
  const options = createTimeOptions(onClick);
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options
  });
}

export function createTotalChart(ctx, data, onItemClicked) {
  const labels = data.map(l => l.To).reverse();
  const datasets = [
    createTotalDataset(data)
  ];
  const onClick = createOnClickFunction(data, onItemClicked);
  const options = createTimeOptions(onClick);
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options
  });
}

export function createHealthChart(ctx, data, onItemClicked) {
  const labels = data.map(l => l.To).reverse();
  const datasets = [
    createHealthDataset(data)
  ];
  const onClick = createOnClickFunction(data, onItemClicked);
  const options = createTimeOptions(onClick);
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options
  });
}
