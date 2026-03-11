import { shapes, winningLines } from './constants.js';

/**
 * Evaluates the current board and stores winner or draw state on the app state.
 *
 * @param {import('./state.js').AppState} state
 */
export function evaluateBoardState(state) {
  const winningLine = winningLines.find(([first, second, third]) => {
    return (
      state.board[first] &&
      state.board[first] === state.board[second] &&
      state.board[second] === state.board[third]
    );
  });

  if (winningLine) {
    state.isGameOver = true;
    state.winnerShape = state.board[winningLine[0]];
    state.winningCells = winningLine;
    return;
  }

  if (state.board.every(Boolean)) {
    state.isGameOver = true;
  }
}

/**
 * Applies the current player's move to a board cell if the move is valid.
 *
 * @param {number} cellIndex
 * @param {import('./state.js').AppState} state
 */
export function applyMoveToCell(cellIndex, state) {
  if (state.isGameOver || state.board[cellIndex]) {
    return;
  }

  state.board[cellIndex] = state.activeShape;
  evaluateBoardState(state);

  if (!state.isGameOver) {
    state.activeShape =
      state.activeShape === shapes.cross ? shapes.circle : shapes.cross;
  }
}

/**
 * Returns the display name of the player whose turn it currently is.
 *
 * @param {import('./state.js').AppState} state
 * @returns {string}
 */
export function getActivePlayerName(state) {
  return state.activeShape === shapes.cross
    ? state.players.first
    : state.players.second;
}

/**
 * Returns the display name of the winner if a winner has been determined.
 *
 * @param {import('./state.js').AppState} state
 * @returns {string}
 */
export function getWinningPlayerName(state) {
  if (state.winnerShape === shapes.cross) {
    return state.players.first;
  }

  if (state.winnerShape === shapes.circle) {
    return state.players.second;
  }

  return '';
}
