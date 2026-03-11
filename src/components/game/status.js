import { shapes } from '../../app/constants.js';
import { getActivePlayerName, getWinningPlayerName } from '../../app/game.js';
import { escapeHtml } from '../../utils/html.js';

/**
 * Renders the right-hand status panel for the current game state.
 *
 * @param {import('../../app/state.js').AppState} state
 * @returns {string}
 */
export function renderGameStatus(state) {
  if (state.winnerShape) {
    return `
      <div class="player-win player-win--winner">
        <span class="winner-label">Gewinner</span>
        <div class="winner-badge">
          <span class="winner-badge__shape shape shape--${state.winnerShape}">${state.winnerShape === shapes.cross ? 'X' : 'O'}</span>
          <div class="winner-badge__content">
            <span class="winner-badge__name">${escapeHtml(getWinningPlayerName(state))}</span>
            <span class="winner-badge__text">hat die Runde gewonnen</span>
          </div>
        </div>
        <span class="winner-title">WIN</span>
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
      <div class="player-chip ${state.activeShape === shapes.cross ? '' : 'inactive'}">
        <span>${escapeHtml(state.players.first)}:</span>
        <span class="shape shape--cross">X</span>
      </div>
      <div class="player-chip ${state.activeShape === shapes.circle ? '' : 'inactive'}">
        <span>${escapeHtml(state.players.second)}:</span>
        <span class="shape shape--circle">O</span>
      </div>
      <p class="turn-indicator">${escapeHtml(getActivePlayerName(state))} ist am Zug.</p>
    </div>
  `;
}
