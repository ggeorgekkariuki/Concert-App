"use client";
import { useState, useEffect } from "react";
import { fetchArtist } from "@/lib/fetchArtist";
import ArtistCard from "@/components/Artists/ArtistCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Artist } from "@/types/Artist";
import { ConcertEvent } from "@/types/Event";
import EventCard from "@/components/EventCard/EventCard";
import { fetchArtistEvents } from "@/lib/fetchArtistEvents";
import { fetchArtistsByGenre } from "@/lib/fetchArtistsByGenre";
import GenreFilter from "@/components/Genres/GenreFilter";

export default function ArtistsPage() {
  // Loading states for Events and Artists
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGenre, setLoadingGenre] = useState(false);

  // This is the name of the artist
  const [artistQuery, setArtistQuery] = useState("Echo Pulse");
  // This is the information about the artist
  const [artistData, setArtistData] = useState<Artist>();
  // All Events FOR THIS artist stored in the database
  const [events, setEvents] = useState<ConcertEvent[]>([]);

  // Set the Genre selector
  const [genre, setGenre] = useState("");
  // Ge the Artists [] with the Genre defined above
  const [artistInThisGenre, setArtistInThisGenre] = useState<Artist[]>([]);

  // Effect that runs when the page renders
  useEffect(() => {
    loadEvents(artistQuery);
    matchedArtistsGotten(artistQuery);
  }, []);

  // Load the Other Artists In this Genre function if genre changes
  useEffect(() => {
    if (genre) {
      // Loads the new Artists with this genre
      loadArtistsByGenre(genre);
    } else {
      // Rerender all the artists with all genres
      loadArtistsByGenre(genre);
    }
  }, [genre]);

  // Load the Artists [] in the selected Genre
  async function loadArtistsByGenre(genre: string) {
    try {
      setLoadingGenre(true);
      const allResults = await fetchArtistsByGenre(genre);
      const topFive = allResults.slice(0, 5); // Top 5 only
      setArtistInThisGenre(topFive);
    } catch (error) {
      console.error("The error from Load Artists in 'this' Genre: ", error);
    } finally {
      setLoadingGenre(false);
    }
  }

  // Events from the Artist
  async function loadEvents(artist: string) {
    try {
      setLoadingEvent(true);
      const result = await fetchArtistEvents(artist);
      setEvents(result);
    } catch (error) {
      console.error("Events fetch failed:", error);
    } finally {
      setLoadingEvent(false);
    }
  }

  /**Favorites Logi */
  // Is an Artist in your favorites?
  const [favorites, setFavorites] = useState<Artist[]>([]);
  // Fetching favorites if they exist from localStorage when the page renders
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteArtists");

    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites) as Artist[];
        setFavorites(parsed);
      } catch (error) {
        console.log("Failed to fetch from local storage", error);
      }
    }
  }, []);

  // Function handling adding or removing Artist:Artist from favorites : Artist [] list
  // Also add favorited Artist:Artist into localStorage
  function toggleFavorite(artist: Artist) {
    let updatedFavorites: Artist[]; // An empty array to hold favorited Artist objects

    // Does this artist's ID exist in the current favorited Artists
    if (favorites.some((fav) => fav.id === artist.id)) {
      // Then remove this Artist's ID
      updatedFavorites = favorites.filter((fav) => fav.id !== artist.id);
    } else {
      // Else add this artist object to our favorites object
      updatedFavorites = [...favorites, artist];
    }

    // Update the favorites state
    setFavorites(updatedFavorites);

    // Update localstorage with the new data
    localStorage.setItem("favoriteArtists", JSON.stringify(updatedFavorites));
  }

  /**  Toggle Search onSubmit - to load fuzzy matched artists */
  // State for finding matched artists
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

  // Handles fuzzy matching 
  async function matchedArtistsGotten(name: string) {
    setLoadingMatchedArtists(true);
    const matchedArtistsResults = await fetchArtist(name);
    console.log("How many objects were fuzzy matched", matchedArtists.length);
    setMatchedArtists(matchedArtistsResults);
    setLoadingMatchedArtists(false);
  }

  return (
    <main className="container">
      <h1>Artist Spotlight</h1>

      {/* Search bar */}
      <section>
        <SearchBar
          query={artistQuery}
          onChange={setArtistQuery}
          onSubmit={() => {
            loadEvents(artistQuery);
            loadArtistsByGenre(genre);
            handleSearchOnSubmit();
          }}
          placeholder="Search by artist name..."
        />
      </section>

      {/* Matched Artists who were fuzzy matched */}
      <section>
      {loadingMatchedArtists ? (<p>Still loading</p>) : 
      matchedArtists.length > 0 ? (
        <div>
          <h3>🔍 Matching Artists</h3>
          {matchedArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onFavorite={toggleFavorite}
              isFavorited={favorites.some((fav) => fav.id === artist.id)}
            />
          ))}
        </div>
      ): (<p>No matches with the prompt provided!</p>)}
      </section>

      {/* Load all Artists who have 'this' genre */}
      <section>
        <h3>Genre Discovery</h3>
        <GenreFilter genre={genre} onChange={setGenre} />
        {loadingGenre ? (
          <p>Loading artists...</p>
        ) : artistInThisGenre.length === 0 ? (
          <p>No artists found for genre "{genre}".</p>
        ) : (
          <div>
            <h3>
              {" "}
              {genre
                ? `More ${genre} artists you might enjoy:`
                : "More artists you might enjoy"}
            </h3>
            {artistInThisGenre.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onFavorite={toggleFavorite}
                isFavorited={favorites.some(
                  (record) => record.id === artist.id
                )}
              />
            ))}
          </div>
        )}
      </section>

      {/* Load Artist Events Results */}
      <section>
        {loadingEvent ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events for the band {artistQuery}!</p>
        ) : (
          <div>
            <h3>Events from {artistQuery}</h3>
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
