export function renderAppShell(content) {
  return `
    <div class="shell">
      <div class="shell__glow shell__glow--left"></div>
      <div class="shell__glow shell__glow--right"></div>
      <header class="masthead">
        <span class="masthead__eyebrow">Vanilla Vite Edition</span>
        <h1 class="masthead__title">Tic Tac Toe</h1>
        <p class="masthead__subtitle">Ein kleines Duell mit neuer Oberfläche statt altem Demo-Look.</p>
      </header>
      ${content}
    </div>
  `;
}
