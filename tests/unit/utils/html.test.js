import { describe, expect, it } from 'vitest';

import { escapeHtml } from '../../../src/utils/html.js';

describe('escapeHtml', () => {
  it('escapes all supported special characters', () => {
    expect(escapeHtml(`<div class="test">'&"</div>`)).toBe(
      '&lt;div class=&quot;test&quot;&gt;&#39;&amp;&quot;&lt;/div&gt;'
    );
  });

  it('returns unchanged content for plain text', () => {
    expect(escapeHtml('Tic Tac Toe')).toBe('Tic Tac Toe');
  });
});
