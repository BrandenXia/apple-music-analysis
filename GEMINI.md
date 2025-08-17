# GEMINI

The frontend is built with React, TypeScript, and Vite. It uses Tailwind CSS for
styling, shadcn/ui for components, Recharts for data visualization, and Jotai for
state management. It also uses Dexie.js for in-browser database management.

The `example/Library.xml` file in the repository is an example of the data that
can be analyzed.

## Features

- **"Forgotten Favorites" Discovery:** Identify tracks that were once popular but haven't been played recently.
- **"Music Taste" Profile:** A summary card of the user's listening personality (e.g., top decade, listener type).
- **Interactive Filtering on Charts:** Allow users to click on charts to filter other views.
- **Dark Mode:** Implement a dark theme for the application.

## Building and Running

This project uses [Bun](https://bun.sh/) as the package manager.

To run the web application:

1. Install dependencies: `bun install`
2. Start the development server: `bun run dev`

The application will then be available at the address shown in the terminal
(usually `http://localhost:5173`).

## Development Conventions

The project uses ESLint for linting and Prettier for formatting. The configurations are in `eslint.config.js` and `.prettierrc.mjs` respectively.

The web application is structured with a clear separation of concerns:

- `src/atoms`: Jotai atoms for state management, split into logical files.
- `src/components`: React components, with subdirectories for UI development
  (`ui`), analysis visualizations (`analysis`), and major components like the `Dashboard`.
- `src/config`: Application configuration, such as the definition of the
  dashboard tabs.
- `src/lib`: Utility functions for parsing, analysis, and other shared logic.
- `src/types`: TypeScript type definitions.

## Project Structure and Data Flow

The project is structured to separate concerns and provide a clear data flow.

- **`src/`**: The main source code directory.
  - **`main.tsx`**: The entry point of the application.
  - **`App.tsx`**: The root component of the application. It handles file uploading and renders the main layout.
  - **`atoms/`**: Contains Jotai atoms for global state management.
    - `data.ts`: Holds the raw and parsed music library data.
    - `settings.ts`: Stores user settings, such as the selected library.
    - `tab.ts`: Manages the currently active tab in the dashboard.
  - **`components/`**: Contains all React components.
    - `analysis/`: Components for visualizing the analysis results.
    - `settings/`: Components for the settings dialog.
    - `ui/`: Reusable UI components from shadcn/ui.
    - `Dashboard.tsx`: The main dashboard component that displays the analysis tabs.
    - `FileUploader.tsx`: The component for uploading the `Library.xml` file.
    - `HeaderControls.tsx`: The header controls, including the settings dialog and theme toggle.
    - `Sidebar.tsx`: The sidebar that lists the available libraries.
  - **`config/`**: Contains configuration files.
    - `tabs.ts`: Defines the tabs available in the dashboard.
  - **`lib/`**: Contains utility functions.
    - `parser.ts`: Parses the `Library.xml` file into a structured format.
    - `analyzer.ts`: The main analyzer that orchestrates the different analysis functions.
    - `analysis/`: Contains the individual analysis functions.
    - `db.ts`: Manages the in-browser database using Dexie.js.
    - `musicbrainz.ts`: Fetches data from the MusicBrainz API.
  - **`types/`**: Contains TypeScript type definitions.

### Data Flow

1.  The user uploads their `Library.xml` file using the `FileUploader` component.
2.  The file is parsed in a web worker using the `parser.ts` utility.
3.  The parsed data is stored in the in-browser database using `db.ts`.
4.  The `data` atom in `atoms/data.ts` is updated with the parsed data.
5.  The `Dashboard` component and its children consume the data from the `data` atom.
6.  The analysis functions in `lib/analysis/` are used to compute the data for the charts.
7.  The analysis results are displayed in the `analysis` components.

# Project Roadmap

The planned features and improvements for this project are tracked in `TODO.md`.

# Git Workflow

After completing a feature, fix, or refactoring task, changes should be committed to Git. Before committing, the following checks must be performed:

1.  **Type Check:** Run `bun run build` to ensure there are no TypeScript errors.
2.  **Lint:** Run `bun run lint` to check for code quality and style issues.
3.  **Format:** Run `bun run format` to ensure the code is consistently formatted.

This ensures a clean and atomic commit history.

**Note:** For commits that only include changes to documentation files (e.g., `.md`), all pre-commit checks may be skipped).
