# Project Overview

This project is a web-based tool for analyzing Apple Music library data. The user can upload their `Library.xml` file, and the application will display various analyses of their listening habits.

The frontend is built with React, TypeScript, and Vite. It uses Tailwind CSS for styling, shadcn/ui for components, Chart.js for data visualization, and Zustand for state management.

The `Library.xml` file in the repository is an example of the data that can be analyzed.

# Building and Running

This project uses [Bun](https://bun.sh/) as the package manager.

To run the web application:

1.  Install dependencies: `bun install`
2.  Start the development server: `bun run dev`

The application will then be available at the address shown in the terminal (usually `http://localhost:5173`).

# Development Conventions

The project uses ESLint for linting. The configuration is in `eslint.config.js`.

The web application is structured with a clear separation of concerns:

- `src/components`: React components
- `src/utils`: Utility functions for parsing and analysis
- `src/store.ts`: Zustand store for state management
- `src/types`: TypeScript type definitions
