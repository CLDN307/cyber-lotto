# CYBER LOTTO 2026 - Blueprint

## Overview
A futuristic, cyber-themed Lotto number generator. It features a neon aesthetic, smooth animations, and immersive ambient music to enhance the "high-tech" atmosphere.

## Implementation Details
- **Visuals**: Dark theme with cyan neon accents, glassmorphism containers, and glowing number balls.
- **Modern CSS**: Uses `linear-gradient` for backgrounds, `backdrop-filter` for blur effects, and `@keyframes` for entry animations.
- **Modern JS**: ES Modules structure, separating logic from presentation.
- **Audio**: Procedural "Cyber Ambient" music generated via the **Web Audio API**. This ensures zero external dependencies and allows the music to react dynamically to user interactions.

## Current State
- `index.html`: Refactored to link external `style.css` and `main.js`. Includes a new audio control button.
- `main.js`: Contains `MusicManager` class and lotto generation logic.
- `style.css`: Contains all visual styling, including the new audio control styles.

## Features Added
1. **Procedural Cyber Music**:
    - **Rhythmic Bass Pulse**: A sawtooth wave with a dynamic low-pass filter sweep (500ms intervals).
    - **Ethereal Pad**: A randomized triangle wave playing notes from an A Major 7th chord with long attack/release.
2. **Interactive Sound Effects**:
    - **Action SFX**: A digital "beep" (square wave) triggers whenever the "Generate" button is pressed.
3. **Smart Audio Control**:
    - A neon toggle button (🔈/🔊) allows the user to start/stop the music, respecting browser autoplay policies.

## Validation
- [x] Music starts only upon user interaction (toggle button).
- [x] Logic is separated into modules.
- [x] Neon UI is maintained and enhanced with audio feedback.
