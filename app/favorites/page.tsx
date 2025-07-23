"use client";
import ArtistCard from "@/components/Artists/ArtistCard";
import { Artist } from "@/types/Artist";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  // Your favorite artists stored in state
  const [favorites, setFavorites] = useState<Artist[]>([]);

  // Read from the localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteArtists");

    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.log(
          "Failed to fetch the favoriteArtists from localStorage",
          error
        );
      }
    }
  }, []);

  return (
    <main className="container">
      <section>
        <h1>Your Favorite Artists</h1>
        {favorites.length === 0 ? (
          <p>No favorites here yet!</p>
        ) : (
          favorites.map((artist) => <ArtistCard artist={artist} key={artist.id}/>)
        )}
      </section>
    </main>
  );
}
