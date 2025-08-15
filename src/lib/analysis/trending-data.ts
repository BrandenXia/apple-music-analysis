import type { Track } from "@/types";

export const getTrendingData = (tracks: Track[], type: "artist" | "album") => {
  // 1. Group tracks by month
  const monthlyAdds: { [month: string]: { [name: string]: number } } = {};

  tracks.forEach((track) => {
    const month = new Date(track["Date Added"]).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const name = type === "artist" ? track.Artist : track.Album;

    if (!name) return;

    if (!monthlyAdds[month]) {
      monthlyAdds[month] = {};
    }
    if (!monthlyAdds[month][name]) {
      monthlyAdds[month][name] = 0;
    }
    monthlyAdds[month][name]++;
  });

  // 2. Find top 5 entities (artists or albums) overall
  const totalCounts: { [name: string]: number } = {};
  Object.values(monthlyAdds).forEach((monthData) => {
    Object.entries(monthData).forEach(([name, count]) => {
      if (!totalCounts[name]) {
        totalCounts[name] = 0;
      }
      totalCounts[name] += count;
    });
  });

  const top5Names = Object.entries(totalCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry) => entry[0]);

  // 3. Prepare chart data
  const labels = Object.keys(monthlyAdds).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const datasets = top5Names.map((name) => {
    const data = labels.map((label) => monthlyAdds[label][name] || 0);
    // Generate a random color for the line
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return {
      label: name,
      data: data,
      borderColor: `rgb(${r}, ${g}, ${b})`,
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
    };
  });

  return {
    labels,
    datasets,
  };
};
