import { Artist } from "@/types/Artist";
import styles from "./ArtistCard.module.css";

type ArtistProps = {
  artist: Artist;
  onFavorite?: (artist: Artist) => void;
  isFavorited?: boolean;
};

export default function ArtistCard({
  artist,
  onFavorite,
  isFavorited,
}: ArtistProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{artist.name}</h2>
      <p className={styles.genre}>{artist.genre}</p>
      {artist.country && (
        <p className={styles.country}>From {artist.country}</p>
      )}
      {artist.bio && <p className={styles.bio}>{artist.bio}</p>}

      {onFavorite && (
        <button
          className={styles.favoriteButton}
          onClick={() => onFavorite(artist)}
        >
          {isFavorited ? "★ Favorited" : "☆ Favorite"}
        </button>
      )}
    </div>
  );
}
