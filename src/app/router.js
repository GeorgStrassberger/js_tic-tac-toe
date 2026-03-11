import { routes } from './constants.js';

export function navigateTo(route, state, renderApp) {
  state.route = route;
  window.location.hash = route;
  renderApp();
}

export function syncRouteFromHash(state) {
  const nextRoute = window.location.hash.replace('#', '') || routes.home;

  if (!Object.values(routes).includes(nextRoute)) {
    state.route = routes.home;
    return routes.home;
  }

  state.route = nextRoute;
  return nextRoute;
}
