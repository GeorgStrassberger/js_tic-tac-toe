import { playerStorageKeys, routes, shapes } from './constants.js';

export function loadPlayers() {
  return {
    first: localStorage.getItem(playerStorageKeys.first) || 'Player 1',
    second: localStorage.getItem(playerStorageKeys.second) || 'Player 2',
  };
}

export function createInitialState() {
  return {
    route: window.location.hash.replace('#', '') || routes.home,
    board: Array(9).fill(null),
    activeShape: shapes.cross,
    isGameOver: false,
    winnerShape: null,
    winningCells: [],
    players: loadPlayers(),
  };
}

export function savePlayers(first, second, state) {
  localStorage.setItem(playerStorageKeys.first, first);
  localStorage.setItem(playerStorageKeys.second, second);
  state.players = { first, second };
}

export function resetGameState(state) {
  state.board = Array(9).fill(null);
  state.activeShape = shapes.cross;
  state.isGameOver = false;
  state.winnerShape = null;
  state.winningCells = [];
}
