import { playerStorageKeys, routes, shapes } from './constants.js';

/**
 * @typedef {Object} AppState
 * @property {string} route
 * @property {(string | null)[]} board
 * @property {string} activeShape
 * @property {boolean} isGameOver
 * @property {string | null} winnerShape
 * @property {number[]} winningCells
 * @property {{ first: string, second: string }} players
 */

/**
 * Loads persisted player names from local storage.
 *
 * @returns {{ first: string, second: string }}
 */
export function loadStoredPlayers() {
  return {
    first: localStorage.getItem(playerStorageKeys.first) || 'Player 1',
    second: localStorage.getItem(playerStorageKeys.second) || 'Player 2',
  };
}

/**
 * Creates the initial application state for the single-page app.
 *
 * @returns {AppState}
 */
export function createAppState() {
  return {
    route: window.location.hash.replace('#', '') || routes.home,
    board: Array(9).fill(null),
    activeShape: shapes.cross,
    isGameOver: false,
    winnerShape: null,
    winningCells: [],
    players: loadStoredPlayers(),
  };
}

/**
 * Persists player names and updates the current app state.
 *
 * @param {string} first
 * @param {string} second
 * @param {AppState} state
 */
export function persistPlayerNames(first, second, state) {
  localStorage.setItem(playerStorageKeys.first, first);
  localStorage.setItem(playerStorageKeys.second, second);
  state.players = { first, second };
}

/**
 * Resets only the current match state while keeping route and player names.
 *
 * @param {AppState} state
 */
export function resetMatchState(state) {
  state.board = Array(9).fill(null);
  state.activeShape = shapes.cross;
  state.isGameOver = false;
  state.winnerShape = null;
  state.winningCells = [];
}
