import { escapeHtml } from '../utils/html.js';

/**
 * Renders the player setup view.
 *
 * @param {import('../app/state.js').AppState} state
 * @returns {string}
 */
export function renderSetupView(state) {
  return `
    <section class="main-frame">
      <div class="game-frame game-frame--image hero-media">
        <img src="./images/blackboard.jpg" alt="Spielbrett Hintergrund" />
        <div class="hero-media__badge">Setup</div>
      </div>
      <div class="player-frame">
        <div class="form-panel">
          <span class="section-kicker">Players</span>
          <div class="player-select">Namen eingeben</div>
          <p class="form-panel__text">Die Namen werden lokal gespeichert und beim nächsten Spiel wieder geladen.</p>
        </div>
        <div class="select-players">
          <label class="player">
            <span>Player 1:</span>
            <input type="text" id="player_1" value="${escapeHtml(state.players.first)}" placeholder="Player 1" />
          </label>
          <label class="player">
            <span>Player 2:</span>
            <input type="text" id="player_2" value="${escapeHtml(state.players.second)}" placeholder="Player 2" />
          </label>
        </div>
        <div class="button-group">
          <button class="app-button" data-action="start-game" type="button">Start Game</button>
          <button class="app-button app-button--secondary" data-action="quit-game" type="button">Back</button>
        </div>
      </div>
    </section>
  `;
}
