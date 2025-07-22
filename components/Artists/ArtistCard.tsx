import { Artist } from "@/types/Artist";
import styles from "./ArtistCard.module.css";

type ArtistProps = {
  artist: Artist;
};

export default function ArtistCard({ artist }: ArtistProps) {
    return (
      <div className={styles.card}>
        <h2 className={styles.name}>{artist.name}</h2>
        <p className={styles.genre}>{artist.genre}</p>
        {artist.country && <p className={styles.country}>From {artist.country}</p>}
        {artist.bio && <p className={styles.bio}>{artist.bio}</p>}
      </div>
  );
}
