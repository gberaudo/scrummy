const faces = ['😢', '😠', '😐', '😃', '😍'] // 9 values for the score are mapped to 5 faces

export function scoreToFace (score) {
  return faces[Math.round(score / 2)]
}

export function computeGlobalHealthIndicator (data) {
  // we assume data is sorted by date in antichronologic order
  const extract = data.filter(l => l.Scrum).slice(0, 20)
  const healthIndicators = extract.map(line => computeHealthIndicator(line))
  const mean = computeMean(healthIndicators)
  return mean
}

/**
 * Simply return the client satisfaction.
 * @param {Object} line
 */
export function computeHealthIndicator (line) {
  return computeMean(line.ClientNumbers)
}

export function computeVariance (array) {
  if (array.length === 0) {
    return -1
  }
  const mean = computeMean(array)
  return Math.sqrt(computeMean(array.map(v => (v - mean) ** 2)))
};

export function computeMean (values) {
  if (values.length === 0) {
    return 0
  }
  return values.reduce((prev, curr) => curr + prev, 0) / values.length
};
