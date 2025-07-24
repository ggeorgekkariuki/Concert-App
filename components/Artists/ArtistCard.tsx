import { Artist } from "@/types/Artist";
import styles from "./ArtistCard.module.css";
import Link from "next/link";

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
    <Link href={`/artists/${artist.id}`}>
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
    </Link>
  );
}
