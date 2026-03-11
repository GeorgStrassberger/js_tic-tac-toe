import { escapeHtml } from '../utils/html.js';

export function renderSetupView(state) {
  return `
    <div class="main-frame">
      <div class="game-frame game-frame--image">
        <img src="./images/blackboard.jpg" alt="Spielbrett Hintergrund" />
      </div>
      <div class="player-frame">
        <div class="player-select">Namen eingeben</div>
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
      </div>
      <div class="btn-frame">
        <div class="button-group">
          <button class="app-button" data-action="start-game" type="button">Start Game</button>
          <button class="app-button app-button--secondary" data-action="quit-game" type="button">Back</button>
        </div>
      </div>
    </div>
  `;
}
