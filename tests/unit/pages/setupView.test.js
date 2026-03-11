import { describe, expect, it } from 'vitest';

import { renderSetupView } from '../../../src/pages/setupView.js';
import { createAppState } from '../../helpers/createAppState.js';

describe('renderSetupView', () => {
  it('renders persisted player names into the setup form', () => {
    const markup = renderSetupView(
      createAppState({
        players: {
          first: 'Mila',
          second: 'Noah',
        },
      })
    );

    expect(markup).toContain('Namen eingeben');
    expect(markup).toContain('value="Mila"');
    expect(markup).toContain('value="Noah"');
  });
});
