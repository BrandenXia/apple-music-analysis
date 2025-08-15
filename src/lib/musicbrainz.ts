import { MusicBrainzApi, CoverArtArchiveApi } from "musicbrainz-api";

const mbApi = new MusicBrainzApi({
  appName: "apple-music-analysis",
  appVersion: "0.1.0",
  appContactInfo: "xxtbranden@outlook.com",
});

const caApi = new CoverArtArchiveApi();

function escapeLucene(value: string) {
  return value.replace(/([+\-&|!(){}[\]^"~*?:\\/])/g, "\\$1");
}

async function getCoverArtUrl(mbid: string) {
  try {
    const url = await caApi.getReleaseCover(mbid, "front");
    return url;
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      return undefined;
    }
    console.error("Failed to fetch cover art:", error);
    return undefined;
  }
}

export async function getTrackImage(trackName: string, artistName: string) {
  try {
    const result = await mbApi.search("recording", {
      query: `recording:"${escapeLucene(trackName)}" AND artist:"${escapeLucene(
        artistName,
      )}"`, 
    });
    const release = result.recordings?.[0]?.releases?.[0];
    if (release?.id) {
      return getCoverArtUrl(release.id);
    }
  } catch (error) {
    console.error("MusicBrainz API error:", error);
  }
  return undefined;
}

export async function getArtistImage() {
  return undefined;
}

export async function getAlbumImage(albumName: string, artistName: string) {
  try {
    const result = await mbApi.search("release", {
      query: `release:"${escapeLucene(albumName)}" AND artist:"${escapeLucene(
        artistName,
      )}"`, 
    });
    const release = result.releases?.[0];
    if (release?.id) {
      return getCoverArtUrl(release.id);
    }
  } catch (error) {
    console.error("MusicBrainz API error:", error);
  }
  return undefined;
}

