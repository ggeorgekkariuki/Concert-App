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
    loadArtist(artistQuery);
    loadEvents(artistQuery);
  }, []);

  // Load the Other Artists In this Genre function
  useEffect(() => {
    loadArtistsByGenre(genre);
  }, []);

  // Update GenreFilter with the genre of the selected band
  useEffect(() => {if (artistData) {setGenre(artistData.genre)}}, [artistData])

  // Load the Artists [] in the selected Genre
  async function loadArtistsByGenre(genre: string) {
    try {
      setLoadingGenre(true);
      const allResults = await fetchArtistsByGenre(genre);
      const topFive = allResults.slice(0, 5) // Top 5 only
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

  // The artist information
  async function loadArtist(name: string) {
    setLoading(true);
    const artist = await fetchArtist(name);
    console.log(artist);
    setArtistData(artist[0]);
    setLoading(false);
  }

  return (
    <main className="container">
      <section>
        <h1>Artist Spotlight</h1>
        <SearchBar
          query={artistQuery}
          onChange={setArtistQuery}
          onSubmit={() => {
            loadArtist(artistQuery);
            loadEvents(artistQuery);
            loadArtistsByGenre(genre);
          }}
          placeholder="Search by artist name..."
        />
        <GenreFilter genre={genre} onChange={setGenre} />
      </section>

      <section>
        {/* Load Artist Bio */}
        {loading ? (
          <p>Loading artist...</p>
        ) : artistQuery && artistData ? (
          <div>
            <h3>Who is {artistQuery}?</h3>
            <ArtistCard artist={artistData} />
          </div>
        ) : (
          <p>No artist found for "{artistQuery}".</p>
        )}

        {/* Load all Artists who have 'this' genre */}
        {loadingGenre ? (
          <p>Loading artists...</p>
        ) : artistInThisGenre.length === 0 ? (
          <p>No artists found for genre "{genre}".</p>
        ) : (
          <div>
            <h3>Other bands in the {genre} genre.</h3>
            {artistInThisGenre.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}

        {/* Load Artist Events Results */}
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
