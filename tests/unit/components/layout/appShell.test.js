import { describe, expect, it } from 'vitest';

import { renderAppShell } from '../../../../src/components/layout/appShell.js';

describe('renderAppShell', () => {
  it('wraps content with the shared shell and masthead', () => {
    const markup = renderAppShell('<main>Content</main>');

    expect(markup).toContain('shell');
    expect(markup).toContain('Vanilla Vite Edition');
    expect(markup).toContain('<main>Content</main>');
  });
});
