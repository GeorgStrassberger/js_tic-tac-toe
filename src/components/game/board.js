import { shapes } from '../../app/constants.js';

export function renderGameBoard(state) {
  const cells = state.board
    .map((value, index) => {
      const isWinningCell = state.winningCells.includes(index);
      const cellClassName = `board__cell${isWinningCell ? ' board__cell--winner' : ''}`;
      const shapeMarkup = value
        ? `<span class="shape shape--${value}">${value === shapes.cross ? 'X' : 'O'}</span>`
        : '';

      return `
        <button class="${cellClassName}" data-cell-index="${index}" type="button" aria-label="Feld ${index + 1}">
          ${shapeMarkup}
        </button>
      `;
    })
    .join('');

  return `<div class="board">${cells}</div>`;
}
