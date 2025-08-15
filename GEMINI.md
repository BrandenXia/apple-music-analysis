# GEMINI

The frontend is built with React, TypeScript, and Vite. It uses Tailwind CSS for
styling, shadcn/ui for components, Chart.js for data visualization, and Jotai for
state management.

The `example/Library.xml` file in the repository is an example of the data that
can be analyzed.

## Building and Running

This project uses [Bun](https://bun.sh/) as the package manager.

To run the web application:

1. Install dependencies: `bun install`
2. Start the development server: `bun run dev`

The application will then be available at the address shown in the terminal
(usually `http://localhost:5173`).

## Development Conventions

The project uses ESLint for linting. The configuration is in `eslint.config.js`.

The web application is structured with a clear separation of concerns:

- `src/atoms`: Jotai atoms for state management, split into logical files.
- `src/components`: React components, with subdirectories for UI development
  (`ui`), analysis visualizations (`analysis`), and major components like the `Dashboard`.
- `src/config`: Application configuration, such as the definition of the
  dashboard tabs.
- `src/lib`: Utility functions for parsing, analysis, and other shared logic.
- `src/types`: TypeScript type definitions.

# Git Workflow

After completing a feature, fix, or refactoring task, changes should be committed to Git before starting the next task. This ensures a clean and atomic commit history.
