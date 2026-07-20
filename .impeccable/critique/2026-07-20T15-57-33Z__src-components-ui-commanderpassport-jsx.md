---
target: src/components/ui/CommanderPassport.jsx
total_score: 29
p0_count: 0
p1_count: 1
timestamp: 2026-07-20T15-57-33Z
slug: src-components-ui-commanderpassport-jsx
---
# Design Critique: CommanderPassport.jsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Toast feedback on action, but name loading state lacks detail. |
| 2 | Match System / Real World | 4 | Cosmic terminology fits perfectly. |
| 3 | User Control and Freedom | 3 | Easy to close, name is editable. |
| 4 | Consistency and Standards | 3 | Inconsistent border radii (rounded-2xl vs rounded-xl). |
| 5 | Error Prevention | 3 | Submit disabled if empty, but no input length constraints. |
| 6 | Recognition Rather Than Recall | 4 | Clear display of active email and username. |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts for action buttons. |
| 8 | Aesthetic and Minimalist Design | 2 | Banned gradient text used on title ("comandante!"). |
| 9 | Error Recovery | 3 | Basic console error logging. |
| 10 | Help and Documentation | 2 | Interactive hint is small and easy to miss. |
| **Total** | | **29/40** | **Good** |

## Anti-Patterns Verdict

- **LLM assessment**: AI-generated tells visible: Gradient text on the primary header. Some layout components feel like boilerplate SaaS dashboard card elements.
- **Deterministic scan**: The automated detector found 1 anti-pattern: `gradient-text` at line 349 (bg-clip-text + bg-gradient).
- **Visual overlays**: Visual overlays not available in headless mode.

## Overall Impression
Great 3D lanyard interaction, but the UI on the right side feels like a generic SaaS template with gradient text slop and slightly inconsistent spacing.

## What's Working
- 3D lanyard preview with drag interaction.
- On-brand cosmic copy.

## Priority Issues
- **[P1] Gradient text in heading**:
  - Why it matters: Saturated AI monoculture tell. Degrades premium brand feel.
  - Fix: Replace gradient span with solid color (`text-blue-400` or custom blue from design system).
  - Suggested command: `$impeccable typeset`
- **[P2] Inconsistent border-radius**:
  - Why it matters: Breaks design system consistency (some cards are rounded-2xl, others rounded-xl).
  - Fix: Standardize on `rounded-xl` or `rounded-2xl` matching `DESIGN.md`.
  - Suggested command: `$impeccable layout`
- **[P2] Missing keyboard shortcuts**:
  - Why it matters: Limits accessibility and speed for power users.
  - Fix: Add key handlers (e.g. `Enter` for download, `Esc` to close).
  - Suggested command: `$impeccable adapt`

## Persona Red Flags
- **Alex (Power User)**: No keyboard shortcuts. Forced to click download and share buttons. High frustration.
- **Jordan (First-Timer)**: The interactive 3D lanyard doesn't make it clear that it's 3D until you drag. The hint "Arrastra o sacude" is small and at the bottom.
- **Sam (Accessibility)**: Screen reader won't easily describe the 3D lanyard, and contrast of text in some places (like `text-zinc-500`) may fall below 4.5:1.

## Minor Observations
- Icon size consistency (some are 10, some 20, some 24).
- Toast timeouts are hardcoded.

## Questions to Consider
- What if the 3D card interaction had a visual "grab" hand cursor on hover?
- Does the "Cambiar nombre" button need to be more prominent?
