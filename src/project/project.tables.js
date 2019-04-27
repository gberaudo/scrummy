
import Tabulator from 'tabulator-tables';

export function createProjectTable(selector, data, onRowClicked) {
  return new Tabulator(selector, {
    selectable: 1,
    data,
    layout:"fitColumns",
    rowClick(e, row) {
      onRowClicked(row.getData());
    },
    height: 200,
    columns:[
      {title:"Project", field:"Project", width:150},
      {title:"Health", field:"Health", formatter:"star", formatterParams:{stars:8}},
      {title:"Sprint", field:"Sprint"},
      {title:"To", field:"To", sorter:"date", align:"center", formatter:"datetime", formatterParams:{
        outputFormat:"DD/MM/YYYY",
        invalidPlaceholder:"(invalid date)",
      }},
      {title:"Velocity", field:"Velocity"},
      {title:"Delivered", field:"Delivered"},
      {title:"Total", field:"Total"},
      {title:"Scrum", field:"Scrum", formatter:"tick"},
    ],
 });
}
