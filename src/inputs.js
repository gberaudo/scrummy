import Papa from 'papaparse';

export function getDataFromFramacalc(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      dynamicTyping: true,
      skipEnplyLines: true,
      comments: '#',
      header: true,
      download: false,
      complete(results) {
        const data = results.data;
        resolve(data);
      }
    });
  });
}

export function getCSVResource() {
  const url = new URL(document.location);
  const csvUrl = url.searchParams.get('csv');
  if (!csvUrl) {
    alert('You must pass the csv parameter');
    return Promise.reject('KO');
  }
  const cache = JSON.parse(localStorage.getItem(csvUrl));
  const now = Date.now() / 1000;
  if (cache && cache.data && (cache.time + 3600 > now)) {
    return Promise.resolve(cache.data);
  }
  return fetch(csvUrl + '.csv').then(response => {
    if (response.ok) {
      return response.text().then(txt => {
        localStorage.setItem(csvUrl, JSON.stringify({
          data: txt,
          time: now
        }));
        return txt;
      });
    }
    return Promise.reject('KO2');
  });
}
