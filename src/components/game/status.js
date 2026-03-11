import { shapes } from '../../app/constants.js';
import { getCurrentPlayerName, getWinnerName } from '../../app/game.js';
import { escapeHtml } from '../../utils/html.js';

export function renderGameStatus(state) {
  if (state.winnerShape) {
    return `
      <div class="player-win">
        <div class="winner-badge">
          <span>${escapeHtml(getWinnerName(state))}</span>
          <span class="shape shape--${state.winnerShape}">${state.winnerShape === shapes.cross ? 'X' : 'O'}</span>
        </div>
        <span>WIN</span>
      </div>
    `;
  }

  if (state.isGameOver) {
    return `
      <div class="player-win">
        <span>Draw</span>
      </div>
    `;
  }

  return `
    <div class="players">
      <div class="${state.activeShape === shapes.cross ? '' : 'inactive'}">
        <span>${escapeHtml(state.players.first)}:</span>
        <span class="shape shape--cross">X</span>
      </div>
      <div class="${state.activeShape === shapes.circle ? '' : 'inactive'}">
        <span>${escapeHtml(state.players.second)}:</span>
        <span class="shape shape--circle">O</span>
      </div>
      <p class="turn-indicator">${escapeHtml(getCurrentPlayerName(state))} ist am Zug.</p>
    </div>
  `;
}
