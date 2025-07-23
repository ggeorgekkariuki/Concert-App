"use client";
import { useEffect, useState } from "react";
import { Artist } from "@/types/Artist";
import { fetchArtistsByGenre } from "@/lib/fetchArtistsByGenre";
import styles from "./Directory.module.css";
import GenreFilter from "@/components/Genres/GenreFilter";
import ArtistCard from "@/components/Artists/ArtistCard";
import SortMenu from "@/components/SortMenu/SortMenu";

export default function ArtistDirectoryPage() {
  // Maintain the genre state
  const [genre, setGenre] = useState("");
  // A list of all the artists
  const [artists, setArtists] = useState<Artist[]>([]);
  // Loading state
  const [loading, setLoading] = useState(false);
  // Keep track of the sort key as either name or country
  const [sortKey, setSortKey] = useState <"name"|"country">("name");

  // A typed accessor to efficiently sort the returned artist array because
  // Typescript rejected [...results].sort((a, b) => a[sortKey].localCompare ...)
  const getSortableValue = (artist: Artist, key: "name" | "country") => {
    return artist[key] || "";
  };

  console.log(artists);

  // Rerun if  the genre component changes
  // Rerun if the sort key changes
  useEffect(() => {
    loadArtists();
  }, [genre, sortKey]);

  async function loadArtists() {
    setLoading(true);
    const results = await fetchArtistsByGenre(genre);
    const sortedResults = [...results].sort((a, b) =>
      getSortableValue(a, sortKey ).localeCompare(
        getSortableValue(b, sortKey)
      )
    );
    setArtists(sortedResults);
    setLoading(false);
  }

  /**
   The error 
   "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Artist'.
  No index signature with a parameter of type 'string' was found on type 'Artist'." when I ran the line
  const sortedResults = [...results].sort((a, b) => a[sortKey].localCompare(b[sortKey]))
   */

  function handleSortKeyChange(sortKey: string) {
    setSortKey(sortKey as "name" | "country");
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
        {/* Sorting here */}
        <SortMenu sortKey={sortKey} onChange={handleSortKeyChange} />
      </section>

      <section className={styles.gridSection}>
        {loading ? (
          <p>Loading artists...</p>
        ) : artists.length === 0 ? (
          <p>No artists found for genre "{genre}".</p>
        ) : (
          <div className={styles.grid}>
            {artists.map((artist) => (
              <div key={artist.id} className={styles.cardWrapper}>
              <ArtistCard key={artist.id} artist={artist} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
