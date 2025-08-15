import { formatDuration, intervalToDuration } from "date-fns";

import type { Track } from "@/types";

export const getTotalTime = (tracks: Track[]): string => {
  const totalMilliseconds = tracks.reduce(
    (acc, track) => acc + track["Total Time"] * track["Play Count"],
    0,
  );
  const duration = intervalToDuration({ start: 0, end: totalMilliseconds });
  return formatDuration(duration);
};
