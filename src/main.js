import './style.css';

import { routes } from './app/constants.js';
import { applyMoveToCell } from './app/game.js';
import { navigateToRoute, syncRouteStateFromHash } from './app/router.js';
import { createAppState, resetMatchState, persistPlayerNames } from './app/state.js';
import { renderAppShell } from './components/layout/appShell.js';
import { renderGameView } from './pages/gameView.js';
import { renderHomeView } from './pages/homeView.js';
import { renderSetupView } from './pages/setupView.js';

const appState = createAppState();

/**
 * Returns the HTML string for the currently active route.
 *
 * @returns {string}
 */
function renderCurrentView() {
  switch (appState.route) {
    case routes.setup:
      return renderSetupView(appState);
    case routes.game:
      return renderGameView(appState);
    case routes.home:
    default:
      return renderHomeView();
  }
}

/**
 * Renders the complete application into the root DOM node.
 */
function renderApp() {
  const appElement = document.querySelector('#app');

  if (!appElement) {
    return;
  }

  appElement.innerHTML = renderAppShell(renderCurrentView());
}

/**
 * Starts a new match using the names from the setup form.
 */
function startNewGame() {
  const firstInput = document.querySelector('#player_1');
  const secondInput = document.querySelector('#player_2');
  const first = firstInput?.value.trim() || 'Player 1';
  const second = secondInput?.value.trim() || 'Player 2';

  persistPlayerNames(first, second, appState);
  resetMatchState(appState);
  navigateToRoute(routes.game, appState, renderApp);
}

/**
 * Resets the current match and returns to the setup screen.
 */
function restartMatch() {
  resetMatchState(appState);
  navigateToRoute(routes.setup, appState, renderApp);
}

/**
 * Leaves the current flow and returns to the landing page.
 */
function returnToHome() {
  resetMatchState(appState);
  navigateToRoute(routes.home, appState, renderApp);
}

/**
 * Handles UI actions emitted by buttons in the rendered views.
 *
 * @param {string | undefined} action
 */
function handleViewAction(action) {
  if (action === 'open-setup') {
    navigateToRoute(routes.setup, appState, renderApp);
  }

  if (action === 'start-game') {
    startNewGame();
  }

  if (action === 'restart-game') {
    restartMatch();
  }

  if (action === 'quit-game') {
    returnToHome();
  }
}

document.addEventListener('click', (event) => {
  const actionTrigger = event.target.closest('[data-action]');
  const cellTrigger = event.target.closest('[data-cell-index]');

  if (actionTrigger) {
    handleViewAction(actionTrigger.dataset.action);
  }

  if (cellTrigger) {
    applyMoveToCell(Number(cellTrigger.dataset.cellIndex), appState);
    renderApp();
  }
});

window.addEventListener('hashchange', () => {
  syncRouteStateFromHash(appState);
  renderApp();
});

syncRouteStateFromHash(appState);
renderApp();
