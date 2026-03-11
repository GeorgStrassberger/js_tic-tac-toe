import { describe, expect, it } from 'vitest';

import { renderHomeView } from '../../../src/pages/homeView.js';

describe('renderHomeView', () => {
  it('renders the welcome view and primary actions', () => {
    const markup = renderHomeView();

    expect(markup).toContain('Welcome');
    expect(markup).toContain('data-action="open-setup"');
    expect(markup).toContain('data-action="quit-game"');
  });
});
