import { renderGameBoard } from '../components/game/board.js';
import { renderGameStatus } from '../components/game/status.js';

export function renderGameView(state) {
  return `
    <section class="main-frame main-frame--game">
      <div class="game-frame game-frame--board">
        ${renderGameBoard(state)}
      </div>
      <div class="player-frame">
        ${renderGameStatus(state)}
        <div class="button-group">
          <button class="app-button" data-action="restart-game" type="button">Restart Game</button>
          <button class="app-button app-button--secondary" data-action="quit-game" type="button">Quit Game</button>
        </div>
      </div>
    </section>
  `;
}
