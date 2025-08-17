import { useAtomValue } from "jotai";

import { musicTasteProfileAtom } from "@/atoms/analysis";
import { MusicTasteProfile } from "@/components/analysis/MusicTasteProfile";

export const MusicTasteProfileTab = () => {
  const profile = useAtomValue(musicTasteProfileAtom);

  return <MusicTasteProfile profile={profile} />;
};
