export const routes = {
  home: 'home',
  setup: 'setup',
  game: 'game',
};

export const shapes = {
  circle: 'circle',
  cross: 'cross',
};

export const playerStorageKeys = {
  first: 'nameEINS',
  second: 'nameZWEI',
};

export const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
