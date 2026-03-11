/**
 * Renders the landing view of the app.
 *
 * @returns {string}
 */
export function renderHomeView() {
  return `
    <section class="main-frame main-frame--home">
      <div class="game-frame game-frame--image hero-media">
        <img src="./images/blackboard.jpg" alt="Spielbrett Hintergrund" />
        <div class="hero-media__badge">2 Players</div>
      </div>
      <div class="player-frame player-frame--home">
        <div class="hero-copy">
          <span class="section-kicker">Start</span>
          <div class="player-win">Welcome</div>
          <p class="hero-copy__text">Namen festlegen, Runde starten und direkt im selben Screen spielen.</p>
        </div>
        <div class="button-group">
          <button class="app-button" data-action="open-setup" type="button">Start Game</button>
          <button class="app-button app-button--secondary" data-action="quit-game" type="button">Quit Game</button>
        </div>
      </div>
    </section>
  `;
}
