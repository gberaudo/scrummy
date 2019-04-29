import moment from 'moment'

/**
 * Find projects we have no news for a while.
 */
function findSilentProjects (data, daysWithoutNews) {
  const lastNews = {}
  let i = data.length
  while (--i >= 0) {
    const l = data[i]
    lastNews[l.Project] = l.To
    // FIXME: To values set in the future are jamming our code, skip them!
  }
  const lastOKMoment = moment().add(-daysWithoutNews, 'days').valueOf()
  const silentProjects = []
  for (let project in lastNews) {
    const to = moment(lastNews[project])
    if (to.valueOf() < lastOKMoment) {
      silentProjects.push({
        project,
        lastNews: to
      })
    }
  }
  silentProjects.sort((a, b) => a.lastNews < b.lastNews)
  return silentProjects
}

export function detectIssues (data) {
  return {
    silentProjects: findSilentProjects(data, 20)
  }
}
