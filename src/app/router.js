import { routes } from './constants.js';

/**
 * Updates route state, syncs the hash and triggers a rerender.
 *
 * @param {string} route
 * @param {import('./state.js').AppState} state
 * @param {() => void} renderApp
 */
export function navigateToRoute(route, state, renderApp) {
  state.route = route;
  window.location.hash = route;
  renderApp();
}

/**
 * Synchronizes the app route with the current location hash.
 *
 * @param {import('./state.js').AppState} state
 * @returns {string}
 */
export function syncRouteStateFromHash(state) {
  const nextRoute = window.location.hash.replace('#', '') || routes.home;

  if (!Object.values(routes).includes(nextRoute)) {
    state.route = routes.home;
    return routes.home;
  }

  state.route = nextRoute;
  return nextRoute;
}
