import type { Track } from "../types";

export const parse = (xml: string): Track[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const trackDicts = xmlDoc.getElementsByTagName("dict")[0].getElementsByTagName("dict")[0].getElementsByTagName("dict");

  const tracks: Track[] = [];

  for (let i = 0; i < trackDicts.length; i++) {
    const trackData: any = {};
    const keys = trackDicts[i].getElementsByTagName("key");
    const values = trackDicts[i].children;

    for (let j = 0; j < keys.length; j++) {
      trackData[keys[j].textContent as any] = values[j * 2 + 1].textContent;
    }

    tracks.push({
      Name: trackData.Name,
      Artist: trackData.Artist,
      Album: trackData.Album,
      Genre: trackData.Genre,
      Grouping: trackData.Grouping,
      Year: parseInt(trackData.Year, 10),
      "Play Count": parseInt(trackData["Play Count"], 10) || 0,
      "Total Time": parseInt(trackData["Total Time"], 10),
      "Date Added": trackData["Date Added"],
    });
  }

  return tracks;
};