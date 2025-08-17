import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { musicTasteProfileAtom } from "@/atoms/analysis";
import { headerControlsAtom } from "@/atoms/header";
import { MusicTasteProfile } from "@/components/analysis/MusicTasteProfile";

export const MusicTasteProfileTab = () => {
  const profile = useAtomValue(musicTasteProfileAtom);
  const setHeaderControls = useSetAtom(headerControlsAtom);

  useEffect(() => {
    setHeaderControls([]);
    return () => setHeaderControls([]);
  }, [setHeaderControls]);

  return <MusicTasteProfile profile={profile} />;
};
