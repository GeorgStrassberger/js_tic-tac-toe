import { beforeEach, describe, expect, it, vi } from 'vitest';

import { routes } from '../../../src/app/constants.js';
import {
  navigateToRoute,
  syncRouteStateFromHash,
} from '../../../src/app/router.js';
import { createAppState } from '../../helpers/createAppState.js';

beforeEach(() => {
  vi.stubGlobal('window', {
    location: {
      hash: '',
    },
  });
});

describe('navigateToRoute', () => {
  it('updates route, hash and triggers render', () => {
    const state = createAppState({ route: routes.home });
    const renderApp = vi.fn();

    navigateToRoute(routes.setup, state, renderApp);

    expect(state.route).toBe(routes.setup);
    expect(window.location.hash).toBe(routes.setup);
    expect(renderApp).toHaveBeenCalledOnce();
  });
});

describe('syncRouteStateFromHash', () => {
  it('falls back to home when no hash is present', () => {
    const state = createAppState({ route: routes.setup });
    window.location.hash = '';

    const nextRoute = syncRouteStateFromHash(state);

    expect(nextRoute).toBe(routes.home);
    expect(state.route).toBe(routes.home);
  });

  it('uses a valid hash route', () => {
    const state = createAppState();
    window.location.hash = '#game';

    const nextRoute = syncRouteStateFromHash(state);

    expect(nextRoute).toBe(routes.game);
    expect(state.route).toBe(routes.game);
  });

  it('falls back to home for unknown hashes', () => {
    const state = createAppState({ route: routes.setup });
    window.location.hash = '#unknown';

    const nextRoute = syncRouteStateFromHash(state);

    expect(nextRoute).toBe(routes.home);
    expect(state.route).toBe(routes.home);
  });
});
