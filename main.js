const edgesData = {
  h: { s: 7, v: 15 },
  s: { t: 10 },
  t: { r: 20, v: 14 },
  v: { t: 14, c: 20, d: 8 },
  d: { c: 12, v: 8 },
  c: { d: 12, v: 20 },
  r: { c: 2, t: 20 },
};

const graphTable = new Map();
const start = 'h';

Object.keys(edgesData).forEach((key) => {
  graphTable.set(key, { prev: null, dist: Infinity });
});
const unvisitedEdges = structuredClone(graphTable);

const getShortestDist = (unvisitedEdgesProp) => {
  const sorted = [...unvisitedEdgesProp.entries()].sort(
    ([, { dist }], [, { dist: bDist }]) => dist > bDist
  );

  const [shortestKey, { dist }] = sorted?.at(0) ?? [null, { dist: Infinity }];

  return {
    shortestKey,
    value: dist,
  };
};

const generateGraph = () => {
  const shortestKeyObj = getShortestDist(unvisitedEdges);
  const shortestKey = shortestKeyObj.shortestKey ?? start;

  if (shortestKey === start) {
    graphTable.set(shortestKey, { prev: null, dist: 0 });
  }
  const baggage = graphTable.get(shortestKey).dist;

  Object.keys(edgesData[shortestKey]).forEach((key) => {
    const edgeDist = edgesData[shortestKey][key];
    const currentShortestDist = graphTable.get(key).dist + edgeDist + baggage;

    const newDistance =
      (currentShortestDist === Infinity ? 0 : currentShortestDist) +
      edgeDist +
      baggage;

    if (newDistance < currentShortestDist) {
      graphTable.set(key, { dist: newDistance, prev: shortestKey });
      unvisitedEdges.set(key, { dist: newDistance, prev: shortestKey });
    }
  });

  unvisitedEdges.delete(shortestKey);

  if (unvisitedEdges.size) {
    generateGraph();
  }
  if (!unvisitedEdges.size) {
    return graphTable;
  }
};

generateGraph();

console.table(
  [...graphTable.entries()].map(([key, { dist, prev }]) => ({
    key,
    dist,
    prev,
  }))
);
console.table(
  [...unvisitedEdges.entries()].map(([key, { dist, prev }]) => ({
    key,
    dist,
    prev,
  }))
);

module.exports = { generateGraph, getShortestDist };
