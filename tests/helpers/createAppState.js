import { shapes } from '../../src/app/constants.js';

export function createAppState(overrides = {}) {
  return {
    route: 'game',
    board: Array(9).fill(null),
    activeShape: shapes.cross,
    isGameOver: false,
    winnerShape: null,
    winningCells: [],
    players: {
      first: 'Alex',
      second: 'Sam',
    },
    ...overrides,
  };
}
