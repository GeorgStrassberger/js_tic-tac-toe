import { describe, expect, it } from 'vitest';

import { shapes } from '../../../../src/app/constants.js';
import { renderGameBoard } from '../../../../src/components/game/board.js';
import { createAppState } from '../../../helpers/createAppState.js';

describe('renderGameBoard', () => {
  it('renders nine clickable board cells', () => {
    const markup = renderGameBoard(createAppState());

    expect(markup.match(/data-cell-index=/g)).toHaveLength(9);
  });

  it('renders empty cells without a shape', () => {
    const markup = renderGameBoard(createAppState());

    expect(markup).not.toContain('shape--cross');
    expect(markup).not.toContain('shape--circle');
  });

  it('renders winner styling for winning cells', () => {
    const markup = renderGameBoard(
      createAppState({
        board: [shapes.cross, null, null, null, null, null, null, null, null],
        winningCells: [0],
      })
    );

    expect(markup).toContain('board__cell board__cell--winner');
    expect(markup).toContain('shape--cross');
  });
});
