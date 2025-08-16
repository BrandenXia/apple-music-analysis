export interface Track {
  Name: string;
  Artist: string;
  Album: string;
  Genre: string;
  Grouping: string;
  Year: number;
  "Play Count": number;
  "Play Date UTC": string;
  "Total Time": number;
  "Date Added": string;
}

export interface Library {
  tracks: Track[];
}

export interface TopTrack {
  name: string;
  artist: string;
  playCount: number;
  playTime: number;
  track: Track;
}

export interface TopArtist {
  name: string;
  playCount: number;
  playTime: number;
  tracks: Track[];
}

export interface TopAlbum {
  name: string;
  playCount: number;
  playTime: number;
  tracks: Track[];
}

export interface TopGenre {
  name: string;
  playCount: number;
  playTime: number;
  tracks: Track[];
}

export interface Analysis {
  mostPlayedTracks: TopTrack[];
  mostPlayedArtists: TopArtist[];
  mostPlayedAlbums: TopAlbum[];
  mostPlayedGenres: TopGenre[];
  topThreeGenres: { name: string; count: number }[];
  topThreeArtists: { name: string; count: number }[];
  totalPlayCount: number;
  totalTime: string;
  forgottenFavorites: TopTrack[];
  musicTasteProfile: MusicTasteProfileData;
}

export interface MusicTasteProfileData {
  topDecade: { decade: string; count: number } | null;
  oldestFavorite?: TopTrack;
  newestFavorite?: TopTrack;
  listenerType: {
    type: "Specialist" | "Generalist";
    description: string;
  };
}
