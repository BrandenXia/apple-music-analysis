import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDuration as formatDurationFns, intervalToDuration } from "date-fns";

import type { ClassValue } from "clsx";
import type { Duration } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeDuration = (milliseconds: number) => {
  const duration: Duration = intervalToDuration({ start: 0, end: milliseconds });

  if (duration.years || duration.months || duration.days || duration.hours) {
    if (duration.seconds && duration.seconds >= 30) {
      duration.minutes = (duration.minutes || 0) + 1;
    }
    delete duration.seconds;
  }

  return formatDurationFns(duration);
};
