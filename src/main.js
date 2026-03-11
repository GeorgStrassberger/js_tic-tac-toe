import './style.css';

import { routes } from './app/constants.js';
import { selectCell } from './app/game.js';
import { navigateTo, syncRouteFromHash } from './app/router.js';
import { createInitialState, resetGameState, savePlayers } from './app/state.js';
import { renderAppShell } from './components/layout/appShell.js';
import { renderGameView } from './pages/gameView.js';
import { renderHomeView } from './pages/homeView.js';
import { renderSetupView } from './pages/setupView.js';

const state = createInitialState();

function renderCurrentView() {
  switch (state.route) {
    case routes.setup:
      return renderSetupView(state);
    case routes.game:
      return renderGameView(state);
    case routes.home:
    default:
      return renderHomeView();
  }
}

function renderApp() {
  const appElement = document.querySelector('#app');

  if (!appElement) {
    return;
  }

  appElement.innerHTML = renderAppShell(renderCurrentView());
}

function startGame() {
  const firstInput = document.querySelector('#player_1');
  const secondInput = document.querySelector('#player_2');
  const first = firstInput?.value.trim() || 'Player 1';
  const second = secondInput?.value.trim() || 'Player 2';

  savePlayers(first, second, state);
  resetGameState(state);
  navigateTo(routes.game, state, renderApp);
}

function restartGame() {
  resetGameState(state);
  navigateTo(routes.setup, state, renderApp);
}

function quitGame() {
  resetGameState(state);
  navigateTo(routes.home, state, renderApp);
}

function handleActionClick(action) {
  if (action === 'open-setup') {
    navigateTo(routes.setup, state, renderApp);
  }

  if (action === 'start-game') {
    startGame();
  }

  if (action === 'restart-game') {
    restartGame();
  }

  if (action === 'quit-game') {
    quitGame();
  }
}

document.addEventListener('click', (event) => {
  const actionTrigger = event.target.closest('[data-action]');
  const cellTrigger = event.target.closest('[data-cell-index]');

  if (actionTrigger) {
    handleActionClick(actionTrigger.dataset.action);
  }

  if (cellTrigger) {
    selectCell(Number(cellTrigger.dataset.cellIndex), state);
    renderApp();
  }
});

window.addEventListener('hashchange', () => {
  syncRouteFromHash(state);
  renderApp();
});

syncRouteFromHash(state);
renderApp();
