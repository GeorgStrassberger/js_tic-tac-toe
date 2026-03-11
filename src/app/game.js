import { shapes, winningLines } from './constants.js';

export function evaluateBoard(state) {
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

export function selectCell(cellIndex, state) {
  if (state.isGameOver || state.board[cellIndex]) {
    return;
  }

  state.board[cellIndex] = state.activeShape;
  evaluateBoard(state);

  if (!state.isGameOver) {
    state.activeShape =
      state.activeShape === shapes.cross ? shapes.circle : shapes.cross;
  }
}

export function getCurrentPlayerName(state) {
  return state.activeShape === shapes.cross
    ? state.players.first
    : state.players.second;
}

export function getWinnerName(state) {
  if (state.winnerShape === shapes.cross) {
    return state.players.first;
  }

  if (state.winnerShape === shapes.circle) {
    return state.players.second;
  }

  return '';
}
