
interface Props {
  genres: { name: string; count: number }[];
}

export const GenreDistribution = ({ genres }: Props) => {
  return (
    <div>
      <ul>
        {genres.map((genre, index) => (
          <li key={index} className="mb-2">
            {genre.name} - {genre.count} songs
          </li>
        ))}
      </ul>
    </div>
  );
};
