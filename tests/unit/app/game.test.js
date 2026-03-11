import { describe, expect, it } from 'vitest';

import { shapes } from '../../../src/app/constants.js';
import {
  applyMoveToCell,
  evaluateBoardState,
  getActivePlayerName,
  getWinningPlayerName,
} from '../../../src/app/game.js';
import { createAppState } from '../../helpers/createAppState.js';

describe('evaluateBoardState', () => {
  it('marks a winner and winning cells for a completed row', () => {
    const state = createAppState({
      board: [
        shapes.cross,
        shapes.cross,
        shapes.cross,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    });

    evaluateBoardState(state);

    expect(state.isGameOver).toBe(true);
    expect(state.winnerShape).toBe(shapes.cross);
    expect(state.winningCells).toEqual([0, 1, 2]);
  });

  it('marks a diagonal win correctly', () => {
    const state = createAppState({
      board: [
        shapes.circle,
        null,
        null,
        null,
        shapes.circle,
        null,
        null,
        null,
        shapes.circle,
      ],
    });

    evaluateBoardState(state);

    expect(state.isGameOver).toBe(true);
    expect(state.winnerShape).toBe(shapes.circle);
    expect(state.winningCells).toEqual([0, 4, 8]);
  });

  it('marks the game as over for a draw board', () => {
    const state = createAppState({
      board: [
        shapes.cross,
        shapes.circle,
        shapes.cross,
        shapes.cross,
        shapes.circle,
        shapes.circle,
        shapes.circle,
        shapes.cross,
        shapes.cross,
      ],
    });

    evaluateBoardState(state);

    expect(state.isGameOver).toBe(true);
    expect(state.winnerShape).toBeNull();
  });
});

describe('applyMoveToCell', () => {
  it('writes the active shape and switches to the next player', () => {
    const state = createAppState();

    applyMoveToCell(0, state);

    expect(state.board[0]).toBe(shapes.cross);
    expect(state.activeShape).toBe(shapes.circle);
  });

  it('ignores moves on occupied cells', () => {
    const state = createAppState({
      board: [shapes.cross, null, null, null, null, null, null, null, null],
    });

    applyMoveToCell(0, state);

    expect(state.board[0]).toBe(shapes.cross);
    expect(state.activeShape).toBe(shapes.cross);
  });

  it('ignores moves after the game is over', () => {
    const state = createAppState({ isGameOver: true });

    applyMoveToCell(2, state);

    expect(state.board[2]).toBeNull();
  });

  it('keeps the active shape unchanged after a winning move', () => {
    const state = createAppState({
      board: [
        shapes.cross,
        shapes.cross,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      activeShape: shapes.cross,
    });

    applyMoveToCell(2, state);

    expect(state.isGameOver).toBe(true);
    expect(state.activeShape).toBe(shapes.cross);
  });
});

describe('player name helpers', () => {
  it('returns the active player name', () => {
    const state = createAppState({ activeShape: shapes.circle });

    expect(getActivePlayerName(state)).toBe('Sam');
  });

  it('returns the winner name', () => {
    const state = createAppState({ winnerShape: shapes.cross });

    expect(getWinningPlayerName(state)).toBe('Alex');
  });

  it('returns an empty string when there is no winner', () => {
    const state = createAppState();

    expect(getWinningPlayerName(state)).toBe('');
  });
});
