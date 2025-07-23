"use client";
import { useEffect, useState } from "react";
import { Artist } from "@/types/Artist";
import { fetchArtistsByGenre } from "@/lib/fetchArtistsByGenre";
import styles from "./Directory.module.css";
import GenreFilter from "@/components/Genres/GenreFilter";
import ArtistCard from "@/components/Artists/ArtistCard";

export default function ArtistDirectoryPage() {
  // Maintain the genre state
  const [genre, setGenre] = useState("");
  // A list of all the artists
  const [artists, setArtists] = useState<Artist[]>([]);
  // Loading state
  const [loading, setLoading] = useState(false);

  // Rerun if  the genre component changes
  useEffect(() => {
    loadArtists();
  }, [genre]);

  async function loadArtists() {
    setLoading(true);
    const query = await fetchArtistsByGenre(genre);
    setArtists(query);
    setLoading(false);
  }

  return (
    <main className="container">
      <section className={styles.filterSection}>
        <h1>🎵 Artist Directory</h1>
        <p>
          Browse artists by genre, discover new voices, and favorite your top
          picks.
        </p>
        <GenreFilter genre={genre} onChange={setGenre} />
      </section>

      <section className={styles.gridSection}>
        {loading ? (
          <p>Loading artists...</p>
        ) : artists.length === 0 ? (
          <p>No artists found for genre "{genre}".</p>
        ) : (
          <div className={styles.grid}>
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
