import { beforeEach, describe, expect, it, vi } from 'vitest';

import { routes, shapes } from '../../../src/app/constants.js';
import {
  createAppState,
  loadStoredPlayers,
  persistPlayerNames,
  resetMatchState,
} from '../../../src/app/state.js';
import { createAppState as createStateFixture } from '../../helpers/createAppState.js';

function createStorageMock() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    clear() {
      store.clear();
    },
  };
}

beforeEach(() => {
  const storage = createStorageMock();

  vi.stubGlobal('localStorage', storage);
  vi.stubGlobal('window', {
    location: {
      hash: '',
    },
  });
});

describe('loadStoredPlayers', () => {
  it('returns fallback names when nothing is stored', () => {
    expect(loadStoredPlayers()).toEqual({
      first: 'Player 1',
      second: 'Player 2',
    });
  });

  it('returns stored player names when available', () => {
    localStorage.setItem('nameEINS', 'Chris');
    localStorage.setItem('nameZWEI', 'Pat');

    expect(loadStoredPlayers()).toEqual({
      first: 'Chris',
      second: 'Pat',
    });
  });
});

describe('createAppState', () => {
  it('creates the expected default state', () => {
    const state = createAppState();

    expect(state.route).toBe(routes.home);
    expect(state.board).toEqual(Array(9).fill(null));
    expect(state.activeShape).toBe(shapes.cross);
    expect(state.players).toEqual({
      first: 'Player 1',
      second: 'Player 2',
    });
  });

  it('uses the current hash as route when present', () => {
    window.location.hash = '#setup';

    const state = createAppState();

    expect(state.route).toBe(routes.setup);
  });
});

describe('persistPlayerNames', () => {
  it('updates local storage and app state', () => {
    const state = createStateFixture();

    persistPlayerNames('Mila', 'Noah', state);

    expect(localStorage.getItem('nameEINS')).toBe('Mila');
    expect(localStorage.getItem('nameZWEI')).toBe('Noah');
    expect(state.players).toEqual({
      first: 'Mila',
      second: 'Noah',
    });
  });
});

describe('resetMatchState', () => {
  it('resets only the match-related fields', () => {
    const state = createStateFixture({
      route: routes.game,
      board: [
        shapes.cross,
        null,
        shapes.circle,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      activeShape: shapes.circle,
      isGameOver: true,
      winnerShape: shapes.cross,
      winningCells: [0, 1, 2],
    });

    resetMatchState(state);

    expect(state.route).toBe(routes.game);
    expect(state.board).toEqual(Array(9).fill(null));
    expect(state.activeShape).toBe(shapes.cross);
    expect(state.isGameOver).toBe(false);
    expect(state.winnerShape).toBeNull();
    expect(state.winningCells).toEqual([]);
  });
});
