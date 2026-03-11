import { renderGameBoard } from '../components/game/board.js';
import { renderGameStatus } from '../components/game/status.js';

export function renderGameView(state) {
  return `
    <div class="main-frame">
      <div class="game-frame">
        ${renderGameBoard(state)}
      </div>
      <div class="player-frame">
        ${renderGameStatus(state)}
      </div>
      <div class="btn-frame">
        <div class="button-group">
          <button class="app-button" data-action="restart-game" type="button">Restart Game</button>
          <button class="app-button app-button--secondary" data-action="quit-game" type="button">Quit Game</button>
        </div>
      </div>
    </div>
  `;
}
