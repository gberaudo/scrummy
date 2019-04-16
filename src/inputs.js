import Papa from 'papaparse';

export function getDataFromFramacalc(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      dynamicTyping: true,
      skipEnplyLines: true,
      comments: '#',
      header: true,
      download: true,
      complete(results) {
        const data = results.data;
        resolve(data);
      }
    });
  });
}