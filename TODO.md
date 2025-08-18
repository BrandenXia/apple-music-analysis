# Project TODO

This file tracks the features and improvements planned for the Apple Music Analysis application.

## Features

- [x] **"Forgotten Favorites" Discovery:** Identify tracks that were once popular but haven't been played recently.
- [x] **"Music Taste" Profile:** A summary card of the user's listening personality (e.g., top decade, listener type).
- [ ] **Playlist Exporter:** Export the "Most Played Tracks" list as a `.m3u` playlist file.
- [x] **Interactive Filtering on Charts:** Allow users to click on charts to filter other views.
- [x] **Dark Mode:** Implement a dark theme for the application.

## Refactoring

- [x] **Consolidate `getMostPlayed` functions:** Refactor `getMostPlayedAlbums`, `getMostPlayedArtists`, and `getMostPlayedGenres` into a single, more generic function to reduce code duplication.
- [x] **Consolidate `getTop` functions:** Combine `getTopThreeArtists` and `getTopThreeGenres` into a single `getTopItems` function.
- [x] **Extract hardcoded values:** Remove hardcoded values (e.g., item counts, date cutoffs) and replace them with constants or function arguments.
- [x] **Simplify `music-taste-profile`:** Break down the `getMusicTasteProfile` function into smaller, more manageable functions.
- [x] **Improve chart colors:** Replace random color generation in `getTrendingData` with a predefined color palette for better consistency and readability.

## Enhancements

- [ ] **More granular filtering:** Add filtering options for year, decade, and genre.
- [ ] **Detailed "Music Taste" profile:** Expand the profile to include top artists/genres by decade and a more detailed analysis of listening habits over time.
- [ ] **Historical comparison:** Allow users to compare their listening habits across different time periods.
- [ ] **Support for other music services:** Add support for services like Spotify or Last.fm.
