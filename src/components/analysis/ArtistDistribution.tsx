
interface Props {
  artists: { name: string; count: number }[];
}

export const ArtistDistribution = ({ artists }: Props) => {
  return (
    <div>
      <ul>
        {artists.map((artist, index) => (
          <li key={index} className="mb-2">
            {artist.name} - {artist.count} songs
          </li>
        ))}
      </ul>
    </div>
  );
};
