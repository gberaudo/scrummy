import {computeMean} from '../indicators';

const someColors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

function createColoredDataset(data, key, color, valuefn = a => a, label) {
  return {
    fill: false,
    label: label || key,
    borderColor: color, // 'rgb(54, 162, 235)'
    data: data.map(l => valuefn(l[key])).reverse()
  };
}


function createClientDatasets(data) {
  const n = data[0].ClientNumbers.length;
  const datass = [];
  data.forEach(l => {
      for (let i = 0; i < n; ++i) {
          const array = datass[i] = datass[i] || [];
          const value = l.ClientNumbers[i];
          array.push(value);
      }   
  });
  return datass.map((d, i) => ({
    fill: false,
    label: `Client ${i + 1}`,
    borderColor: someColors[i],
    data: d.reverse()
  }));
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

function createTimeScale() {
  return {
    xAxes: [{
      type: 'time',
      time: {
        displayFormats: {
          quarter: 'MMM YYYY'
        }
      }
    }]
  };
}

function createTemporalLabels(data) {
  return data.map(l => l.To).reverse();
}

export function createVelocityChart(data, onItemClicked) {
  const labels = createTemporalLabels(data);
  const datasets = [
    createColoredDataset(data, 'Velocity', 'rgb(54, 262, 235)')
  ];
  const options = {
    responsive: true,
    onClick: createOnClickFunction(data, onItemClicked),
    scales: createTimeScale()
  };
  return {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options
  };
}

export function createHealthChart(data, onItemClicked) {
  const labels = createTemporalLabels(data);
  const datasets = [
    createHealthDataset(data)
  ];
  const options = {
    responsive: true,
    onClick: createOnClickFunction(data, onItemClicked),
    scales: createTimeScale()
  };
  return {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options
  };
}

function createMultiChart({data, datasets, onItemClicked}) {
  const labels = createTemporalLabels(data);
  const options = {
    responsive: true,
    onClick: createOnClickFunction(data, onItemClicked),
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            quarter: 'MMM YYYY'
          }
        }
      }]
    }
  };
  return {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options
  };
}


export function createDaysChart(data, onItemClicked) {
  const keys = ['Done', 'Planned'];
  const datasets = keys.map((key, i) => createColoredDataset(data, key, someColors[i]));
  return createMultiChart({data, datasets, onItemClicked});
}

export function createPointsChart(data, onItemClicked) {
  const keys = ['Started', 'Delivered', 'Total'];
  const datasets = keys.map((key, i) => createColoredDataset(data, key, someColors[i]));
  return createMultiChart({data, datasets, onItemClicked});
}

export function createClientChart(data, onItemClicked) {
  const datasets = createClientDatasets(data);
  return createMultiChart({data, datasets, onItemClicked});
}

export function createFeedbacksChart(data, onItemClicked) {
  const keys = ['Client', 'Devs', 'PO', 'SM', 'Direction'];
  const valueFn = array => computeMean(array);
  const labels = createTemporalLabels(data);
  const datasets = keys.map((key, i) => createColoredDataset(data, key + 'Numbers', someColors[i], valueFn, key));
  const options = {
    responsive: true,
    onClick: createOnClickFunction(data, onItemClicked),
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
        ticks: {
            min: 0,
            max: 8
        },
      }
    ]}
    };
  return {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options
  };
}

export function createFeedbacksRadarChart(line) {
  const labels = [
    'Client',
    'Devs',
    'PO',
    'Direction',
    'SM'
  ];
  const datasets = [{
    label: `Sprint ${line.Sprint} feedbacks`,
    data: [
      computeMean(line.ClientNumbers),
      computeMean(line.DevsNumbers),
      computeMean(line.PONumbers),
      computeMean(line.DirectionNumbers),
      computeMean(line.SMNumbers),
    ].map(n => Number.isNaN(n) ? 0 : n)
  }];
  return {
    type: 'radar',
    options: {
      scale: {
        ticks: {
          min: 0,
          max: 8
        }
      }
    },
    data: {
      labels,
      datasets
    },
  };
}
