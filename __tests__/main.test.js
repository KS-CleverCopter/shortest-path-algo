const { getShortestDist, generateGraph } = require('../main.js');

describe('getShortestDist', () => {
  it('should return the shortest distance and key', () => {
    const unvisitedEdges = new Map([
      ['a', { dist: 10 }],
      ['b', { dist: 5 }],
      ['c', { dist: 15 }],
      ['d', { dist: 18 }],
      ['q', { dist: 11 }],
    ]);
    expect(getShortestDist(unvisitedEdges)).toEqual({
      shortestKey: 'b',
      value: '5',
    });
  });
});

describe('generateGraph', () => {
  it('should generate the shortest path graph', () => {
    const graphTable = generateGraph();
    expect(graphTable.size).toBe(7);
    expect(graphTable.get('h')).toEqual({ dist: 0, prev: null });
    expect(graphTable.get('s')).toEqual({ dist: 7, prev: 'h' });
    expect(graphTable.get('t')).toEqual({ dist: 17, prev: 's' });
    expect(graphTable.get('v')).toEqual({ dist: 15, prev: 'h' });
    expect(graphTable.get('c')).toEqual({ dist: 35, prev: 'v' });
    expect(graphTable.get('d')).toEqual({ dist: 23, prev: 'v' });
    expect(graphTable.get('r')).toEqual({ dist: 37, prev: 't' });
  });
});
