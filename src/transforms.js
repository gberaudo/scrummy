export const FEEDBACK_VALUES = {
  '++': 8,
  '+': 6,
  '=+': 5,
  '=': 4,
  '=-': 3,
  '~': 4,
  'NSOW': 4,
  '-': 2,
  '--': 0
}

export function parseFeedback (str) {
  const feedbacks = str.split(',').map(s => s.trim())
  return feedbacks.map(f => FEEDBACK_VALUES[f])
};

function parseSerialNumberDate (numberDate, timezoneOffset) {
  return new Date(Date.UTC(0, 0, numberDate, 0, timezoneOffset))
}

export function normalizeData (data) {
  // Remove empty lines
  data = data.filter(e => !!e.Project)

  // Sort lines in anti-chronological order.
  data = data.sort((l1, l2) => {
    const d1 = l2.To - l1.To
    return d1 !== 0 ? d1 : l2.From - l1.From
  })

  const timezoneOffset = new Date().getTimezoneOffset()
  data.forEach(l => {
    // Parse Serial-number dates as JS Date objects
    l.From = parseSerialNumberDate(l.From, timezoneOffset)
    l.To = parseSerialNumberDate(l.To, timezoneOffset)

    // Parse feedbacks
    l.ClientNumbers = parseFeedback(l.Client)
    l.DevsNumbers = parseFeedback(l.Devs)
    l.PONumbers = parseFeedback(l.PO)
    l.SMNumbers = parseFeedback(l.SM)
    l.DirectionNumbers = parseFeedback(l.Direction)

    // Truncate velocities
    l.Velocity = Math.round(l.Velocity * 10) / 10
  })
  return data
};

export function extractDataSince (data, since) {
  const extract = []
  for (const line of data) {
    if (line.To < since) {
      break
    }
    extract.push(line)
  }
  return extract
};

export function extractDistinctProjects (data) {
  const extract = []
  const knownProjects = new Set()
  for (const line of data) {
    if (!knownProjects.has(line.Project)) {
      knownProjects.add(line.Project)
      extract.push(line)
    }
  }
  return extract
}
