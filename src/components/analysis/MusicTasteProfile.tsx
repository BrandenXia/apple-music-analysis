import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { MusicTasteProfileData } from "@/types";

interface Props {
  profile: MusicTasteProfileData;
}

export const MusicTasteProfile = ({ profile }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Top Decade</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.topDecade ? (
            <>
              <p className="text-4xl font-bold">{profile.topDecade.decade}</p>
              <p className="text-muted-foreground">{profile.topDecade.count} songs</p>
            </>
          ) : (
            <p className="text-muted-foreground">Not enough data</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Listener Type</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{profile.listenerType.type}</p>
          <p className="text-muted-foreground">{profile.listenerType.description}</p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Song</TableHead>
                <TableHead>Artist</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Oldest Favorite</TableCell>
                <TableCell>{profile.oldestFavorite?.name || "N/A"}</TableCell>
                <TableCell>{profile.oldestFavorite?.artist || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Newest Favorite</TableCell>
                <TableCell>{profile.newestFavorite?.name || "N/A"}</TableCell>
                <TableCell>{profile.newestFavorite?.artist || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
