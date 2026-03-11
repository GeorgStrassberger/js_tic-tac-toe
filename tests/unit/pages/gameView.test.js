import { describe, expect, it } from 'vitest';

import { shapes } from '../../../src/app/constants.js';
import { renderGameView } from '../../../src/pages/gameView.js';
import { createAppState } from '../../helpers/createAppState.js';

describe('renderGameView', () => {
  it('renders the board and action buttons', () => {
    const markup = renderGameView(createAppState());

    expect(markup).toContain('board');
    expect(markup).toContain('data-action="restart-game"');
    expect(markup).toContain('data-action="quit-game"');
  });

  it('renders the winner state through the composed status component', () => {
    const markup = renderGameView(
      createAppState({
        winnerShape: shapes.circle,
        isGameOver: true,
      })
    );

    expect(markup).toContain('Gewinner');
    expect(markup).toContain('shape--circle');
  });
});
