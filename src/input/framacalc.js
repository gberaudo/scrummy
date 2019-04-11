import Papa from 'papaparse';


export async function getData(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      dynamicTyping: true,
      skipEnplyLines: true,
      comments: '#',
      header: true,
      transformHeader(header) {
        // only available in next version of papaparse
        return header.toLoweCase();
      },
      download: true,
      complete: function(results) {
        resolve(results.data);
      }
    });
  });
}