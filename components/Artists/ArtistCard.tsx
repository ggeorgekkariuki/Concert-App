import styles from "./ArtistCard.module.css";

type ArtistProps = {
  name: string;
  country?: string;
  genre: string;
};

export default function ArtistCard({ name, country, genre }: ArtistProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.genre}>{genre}</p>
      {country && <p className={styles.country}>From {country}</p>}
    </div>
  );
}
