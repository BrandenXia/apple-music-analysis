import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { forgottenFavoritesAtom } from "@/atoms/analysis";
import { headerControlsAtom } from "@/atoms/header";
import { ForgottenFavorites } from "@/components/analysis/ForgottenFavorites";

export const ForgottenFavoritesTab = () => {
  const items = useAtomValue(forgottenFavoritesAtom);
  const setHeaderControls = useSetAtom(headerControlsAtom);

  useEffect(() => {
    setHeaderControls(["search"]);
    return () => setHeaderControls([]);
  }, [setHeaderControls]);

  return <ForgottenFavorites items={items} />;
};
