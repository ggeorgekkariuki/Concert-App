"use client";
import { useEffect, useState } from "react";
import { Artist } from "@/types/Artist";
import { fetchArtistsByGenre } from "@/lib/fetchArtistsByGenre";
import styles from "./Directory.module.css";
import GenreFilter from "@/components/Genres/GenreFilter";
import ArtistCard from "@/components/Artists/ArtistCard";
import SortMenu from "@/components/SortMenu/SortMenu";
import { fetchArtist } from "@/lib/fetchArtist";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function ArtistDirectoryPage() {
  // Maintain the genre state
  const [genre, setGenre] = useState("");
  // A list of all the artists
  const [artists, setArtists] = useState<Artist[]>([]);
  // Loading state
  const [loading, setLoading] = useState(false);
  // Keep track of the sort key as either name or country
  const [sortKey, setSortKey] = useState<"name" | "country">("name");

  // A typed accessor to efficiently sort the returned artist array because
  // Typescript rejected [...results].sort((a, b) => a[sortKey].localCompare ...)
  const getSortableValue = (artist: Artist, key: "name" | "country") => {
    return artist[key] || "";
  };

  // Rerun if  the genre component changes
  // Rerun if the sort key changes
  useEffect(() => {
    loadArtists();
  }, [genre, sortKey]);

  async function loadArtists() {
    setLoading(true);
    const results = await fetchArtistsByGenre(genre);
    const sortedResults = [...results].sort((a, b) =>
      getSortableValue(a, sortKey).localeCompare(getSortableValue(b, sortKey))
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

  /** Favoriting Logic */
  // The favorite holds artists:Artist[] in state
  const [favorites, setFavorites] = useState<Artist[]>([]);

  // Find favorites in localStorage once on render
  useEffect(() => {
    const storedFavoritedArtists = localStorage.getItem("favoritedArtists");

    if (storedFavoritedArtists) {
      try {
        // If this string exists, give me back the Object or Arrays
        const results = JSON.parse(storedFavoritedArtists) as Artist[];
        setFavorites(results);
        //
      } catch (error) {
        console.log("Failed to fetch error from localstorage ", error);
      }
    }
  }, []);

  // Toggle the favorites button when clicked
  function handleToggleFavoritesButton(artist: Artist) {
    let updatedFavorites: Artist[];
    // Does this artist exist in the favorites:Artist[] object
    if (favorites.some((record) => record.id === artist.id)) {
      updatedFavorites = favorites.filter((record) => record.id !== artist.id);
    } else {
      updatedFavorites = [...favorites, artist];
    }

    // Finally update the state with the new favorites list
    setFavorites(updatedFavorites);

    // Update the local storage
    localStorage.setItem("favoritedArtists", JSON.stringify(updatedFavorites));
  }

  /**  Toggle Search onSubmit - to load fuzzy matched artists */
  // State for finding matched artists
  const [artistQuery, setArtistQuery] = useState("");
  const [matchedArtists, setMatchedArtists] = useState<Artist[]>([]);
  const [loadingMatchedArtists, setLoadingMatchedArtists] = useState(false);

  // Handle the search of the search
  async function handleSearchOnSubmit() {
    setLoadingMatchedArtists(true);
    const matchedArtistsResults = await fetchArtist(artistQuery);
    console.log("How many objects were fuzzy matched", matchedArtists.length);
    setMatchedArtists(matchedArtistsResults);
    setLoadingMatchedArtists(false);
  }

  return (
    <main className="container">
      <section className={styles.filterSection}>
        <h1>🎵 Artist Directory</h1>
        <p>
          Browse artists by genre, discover new voices, and favorite your top
          picks.
        </p>

        <div className={styles.options}>
          {/* Search bar */}
          <div className={styles.optionItem}>
            {" "}
            <SearchBar
              query={artistQuery}
              onChange={setArtistQuery}
              onSubmit={() => {
                loadArtists();
                handleSearchOnSubmit();
              }}
              placeholder="Search by artist name..."
            />
          </div>

          {/* Genre */}
          <div className={styles.optionItem}>
            <GenreFilter genre={genre} onChange={setGenre} />
          </div>

          {/* Sorting here */}
          <div className={styles.optionItem}>
            <SortMenu sortKey={sortKey} onChange={handleSortKeyChange} />
          </div>
        </div>
      </section>

      {/* Matched Artists who were fuzzy matched */}
      {loadingMatchedArtists && artistQuery !== "" ? 
        (<section><h1>This only appears</h1></section>) : (null)
      }
      <section>
      {loadingMatchedArtists ? (<p>Still loading</p>) : 
      matchedArtists.length > 0 ? (
        <div>
          <h3>🔍 Matching Artists</h3>
          {matchedArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onFavorite={handleToggleFavoritesButton}
              isFavorited={favorites.some((fav) => fav.id === artist.id)}
            />
          ))}
        </div>
      ): (<p>Search for your artists!</p>)}
      </section>

      <section className={styles.gridSection}>
        <h2>All artists</h2>
        {/* Loading general results */}
        {artistQuery === "" && loading ? (
          <p>Loading artists...</p>
        ) : artists.length === 0 ? (
          <p>No artists found for genre "{genre}".</p>
        ) : (
          <div className={styles.grid}>
            {artists.map((artist) => (
              <div key={artist.id} className={styles.cardWrapper}>
                <ArtistCard
                  artist={artist}
                  onFavorite={handleToggleFavoritesButton}
                  isFavorited={favorites.some(
                    (record) => record.id === artist.id
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
