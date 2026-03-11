import { describe, expect, it } from 'vitest';

import { shapes } from '../../../../src/app/constants.js';
import { renderGameStatus } from '../../../../src/components/game/status.js';
import { createAppState } from '../../../helpers/createAppState.js';

describe('renderGameStatus', () => {
  it('renders the winner card when a winner exists', () => {
    const markup = renderGameStatus(
      createAppState({
        winnerShape: shapes.cross,
        isGameOver: true,
      })
    );

    expect(markup).toContain('Gewinner');
    expect(markup).toContain('hat die Runde gewonnen');
    expect(markup).toContain('winner-badge__name">Alex<');
  });

  it('renders the winner card for the circle player', () => {
    const markup = renderGameStatus(
      createAppState({
        winnerShape: shapes.circle,
        isGameOver: true,
      })
    );

    expect(markup).toContain('winner-badge__name">Sam<');
    expect(markup).toContain('winner-badge__shape shape shape--circle');
  });

  it('renders the draw state when the game ends without a winner', () => {
    const markup = renderGameStatus(
      createAppState({
        isGameOver: true,
      })
    );

    expect(markup).toContain('Draw');
  });

  it('renders both player chips during an active game', () => {
    const markup = renderGameStatus(createAppState());

    expect(markup).toContain('player-chip');
    expect(markup).toContain('Alex:');
    expect(markup).toContain('Sam:');
  });

  it('marks the second player as active when circle has the turn', () => {
    const markup = renderGameStatus(
      createAppState({
        activeShape: shapes.circle,
      })
    );

    expect(markup).toContain('player-chip inactive');
    expect(markup).toContain('Sam ist am Zug.');
  });
});
