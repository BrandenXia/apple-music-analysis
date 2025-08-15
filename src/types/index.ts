
export interface Track {
  Name: string;
  Artist: string;
  Album: string;
  Genre: string;
  Grouping: string;
  Year: number;
  "Play Count": number;
  "Total Time": number;
  "Date Added": string;
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

export interface TopTrack {
  name: string;
  artist: string;
  playCount: number;
  playTime: number;
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
}
