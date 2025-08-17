import { useAtomValue } from "jotai";

import { forgottenFavoritesAtom } from "@/atoms/analysis";
import { ForgottenFavorites } from "@/components/analysis/ForgottenFavorites";

export const ForgottenFavoritesTab = () => {
  const items = useAtomValue(forgottenFavoritesAtom);

  return <ForgottenFavorites items={items} />;
};
