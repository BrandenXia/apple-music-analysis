import { clsx } from "clsx";
import { formatDuration as formatDurationFns, intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
import type { Duration } from "date-fns";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatTimeDuration = (milliseconds: number) => {
  const duration: Duration = intervalToDuration({ start: 0, end: milliseconds });

  if (duration.years || duration.months || duration.days || duration.hours) {
    if (duration.seconds && duration.seconds >= 30) duration.minutes = (duration.minutes || 0) + 1;
    delete duration.seconds;
  }

  return formatDurationFns(duration);
};

export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
