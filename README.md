# Tic Tac Toe

Ein kleines Tic-Tac-Toe-Projekt als Single-Page-App mit Vanilla JavaScript und Vite.

## Überblick

Die App rendert alle Ansichten clientseitig aus einer einzigen [index.html](/Users/gest/Development/js_tic-tac-toe/index.html). Es gibt drei zentrale Zustände:

- Startansicht
- Setup mit Spielernamen
- Spielansicht mit Gewinner- oder Draw-Status

Die Spielernamen werden lokal im Browser per `localStorage` gespeichert.

## Tech Stack

- Vite
- Vanilla JavaScript mit ES Modules
- Vitest mit V8-Coverage
- ESLint
- Prettier
- eigenes CSS ohne Bootstrap oder externe Font-CDNs
- GitHub Actions für CI sowie Review-, Staging- und Production-Deployments

## Projektstruktur

```text
.
├── .github/workflows/
├── public/images/
├── src/
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── main.js
│   └── style.css
├── tests/
│   ├── helpers/
│   └── unit/
├── index.html
├── package.json
└── vite.config.js
```

Kurz erklärt:

- `src/main.js`: App-Einstieg, Event-Wiring, View-Auswahl
- `src/app/`: Routing, Zustand und Spiellogik
- `src/components/`: kleinere wiederverwendbare Render-Bausteine
- `src/pages/`: gerenderte Hauptansichten
- `src/utils/`: Hilfsfunktionen
- `public/images/`: statische Assets, die unverändert in den Build kopiert werden
- `tests/unit/`: Unit-Tests für App-Logik, Renderer und Utilities
- `tests/helpers/`: gemeinsame Test-Fixtures und Hilfsfunktionen

## Lokale Entwicklung

Voraussetzung:

- Node.js 24

Installation:

```bash
npm ci
```

Dev-Server starten:

```bash
npm run dev
```

Produktionsbuild erzeugen:

```bash
npm run build
```

Build lokal prüfen:

```bash
npm run preview
```

## Scripts

- `npm run dev`: startet den Vite-Dev-Server
- `npm run build`: erzeugt den Produktionsbuild in `dist/`
- `npm run preview`: startet eine lokale Vorschau des gebauten Projekts
- `npm run test`: führt alle Unit-Tests aus
- `npm run test:watch`: startet Vitest im Watch-Modus
- `npm run test:coverage`: führt Tests mit Coverage-Report aus
- `npm run lint`: prüft den JavaScript-Code mit ESLint
- `npm run format`: formatiert das Projekt mit Prettier
- `npm run format:check`: prüft, ob alle Dateien im Prettier-Stil formatiert sind

## Tests und Coverage

Die Unit-Tests liegen im Ordner `tests/` und decken aktuell App-State, Routing, Spiellogik, Rendering-Helfer und Views ab.

Coverage lokal ausführen:

```bash
npm run test:coverage
```

Dabei wird:

- ein Coverage-Report im Terminal ausgegeben
- ein HTML-Report im Ordner `coverage/` erzeugt

Aktuelle Zielwerte in Vitest:

- Statements: mindestens `90%`
- Branches: mindestens `90%`
- Functions: mindestens `90%`
- Lines: mindestens `90%`

## Deployment

Der Produktionsbuild liegt nach `npm run build` in `dist/` und kann als statische Website veröffentlicht werden.

Die GitHub-Actions-Workflows nutzen aktuell `lftp`, um den Build per SFTP auf den Webspace hochzuladen.

Vorhandene Workflows:

- [ci.yml](/Users/gest/Development/js_tic-tac-toe/.github/workflows/ci.yml): führt `format`, `lint`, `test:coverage` und `build` in parallelen Jobs aus
- [deploy-review.yml](/Users/gest/Development/js_tic-tac-toe/.github/workflows/deploy-review.yml): deployt PR-Stände auf den Review-Pfad, aber erst nach erfolgreicher CI
- [deploy-staging.yml](/Users/gest/Development/js_tic-tac-toe/.github/workflows/deploy-staging.yml): deployt erfolgreiche `main`-Builds auf Staging
- [deploy-prod.yml](/Users/gest/Development/js_tic-tac-toe/.github/workflows/deploy-prod.yml): manueller Production-Deploy

Aktueller Ablauf:

1. CI läuft bei Pushes und PRs.
2. Review-Deployments starten erst nach erfolgreicher PR-CI.
3. Staging-Deployments starten erst nach erfolgreicher CI auf `main`.
4. Production bleibt ein manueller Workflow mit geschütztem Environment.

## GitHub Secrets

Für die Deployments werden aktuell diese Secrets erwartet:

- `STRATO_SFTP_HOST`
- `STRATO_SFTP_USER`
- `STRATO_SFTP_PASSWORD`
- `STRATO_SFTP_PORT`
- `STRATO_SFTP_PATH`

Empfohlene Zuordnung:

- `production`-Environment: Production-Zielpfad und Zugang
- `staging`-Environment: Staging-Zielpfad und Zugang
- Review-Workflow: aktuell ohne eigenes Environment, mit dem bestehenden Review-Pfad auf dem Server

## Hinweise

- Die App verwendet Hash-basiertes Routing innerhalb einer einzigen HTML-Seite.
- Review-Deployments landen aktuell auf einem festen Review-Pfad und überschreiben sich bewusst, weil das Projekt derzeit allein entwickelt wird.
- Ein späterer Wechsel auf `rsync` ist möglich, wenn echter SSH-Zugang mit Key verwendet werden soll.
- `src/main.js` ist bewusst von der Coverage-Auswertung ausgenommen, weil dort vor allem Bootstrap- und Event-Wiring-Code sitzt.
