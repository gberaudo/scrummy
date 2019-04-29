
import Tabulator from 'tabulator-tables'
import { extractDataSince } from '../transforms'
import { computeMean } from '../indicators'

function aggregatedProjects (data) {
  const projects = []
  const aggregates = new Map()
  for (const line of data) {
    const project = line.Project
    if (!aggregates.has(project)) {
      aggregates.set(project, {
        Project: project,
        LastTo: line.To,
        SprintsCount: 1,
        Velocities: [line.Velocity],
        Tos: [line.To],
        Totals: [line.Total],
        Healths: [line.Health]
      })
      projects.push(project)
    } else {
      const record = aggregates.get(project)
      record.SprintsCount++
      record.Velocities.push(line.Velocity)
      record.Tos.push(line.To)
      record.Totals.push(line.Total)
      record.Healths.push(line.Health)
    }
  }
  const aggData = projects.map(project => aggregates.get(project))
  aggData.forEach(l => {
    l.Health = computeMean(l.Healths)
  })
  return aggData
}

export function createMainTable (selector, data, onRowClicked) {
  const now = new Date()
  data = extractDataSince(data, new Date().setMonth(now.getMonth() - 3))
  data = aggregatedProjects(data)
  return new Tabulator(selector, {
    data,
    layout: 'fitColumns',
    rowClick (e, row) {
      onRowClicked(row.getData())
    },
    columns: [
      { title: 'Project', field: 'Project', width: 150 },
      { title: 'Health', field: 'Health', formatter: 'star', formatterParams: { stars: 8 } },
      { title: 'SprintsCount', field: 'SprintsCount' },
      { title: 'LastTo',
        field: 'LastTo',
        sorter: 'date',
        align: 'center',
        formatter: 'datetime',
        formatterParams: {
          outputFormat: 'DD/MM/YYYY',
          invalidPlaceholder: '(invalid date)'
        } },
      { title: 'Velocities', field: 'Velocities' },
      { title: 'Totals', field: 'Totals' },
      { title: 'Healths', field: 'Healths' }
    ]
  })
}
