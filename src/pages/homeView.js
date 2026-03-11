export function renderHomeView() {
  return `
    <div class="main-frame">
      <div class="game-frame game-frame--image">
        <img src="./images/blackboard.jpg" alt="Spielbrett Hintergrund" />
      </div>
      <div class="player-frame">
        <div class="player-win">Welcome</div>
      </div>
      <div class="btn-frame">
        <div class="button-group">
          <button class="app-button" data-action="open-setup" type="button">Start Game</button>
          <button class="app-button app-button--secondary" data-action="quit-game" type="button">Quit Game</button>
        </div>
      </div>
    </div>
  `;
}
