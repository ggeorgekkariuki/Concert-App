"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import { ConcertEvent } from "@/types/Event";
import { fetchArtistEvents } from "@/lib/fetchArtist";
import EventCard from "@/components/EventCard/EventCard";
import ArtistCard from "@/components/Artists/ArtistCard";

export default function ArtistsPage() {
  const placeholder = "Search Events by Artist ...";

  // Current artist in the form
  const [artistQuery, setArtistQuery] = useState("Echo Pulse");

  // Current Events with the artist
  const [events, setEvents] = useState<ConcertEvent[]>([]);

  // Loading toggles
  const [loading, setLoading] = useState(false);

  // Load events for the artists
  useEffect(() => {
    loadEvents(artistQuery);
  }, []);

  // Source from the database
  async function loadEvents(artist: string) {
    try {
      setLoading(true);
      const result = await fetchArtistEvents(artist);
      setEvents(result);
    } catch (error) {
      console.error("Artist fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <section>
        <h1>Featured Artists</h1>
        <p>
          From rising stars to seasoned legends—meet the musicians moving
          Europe.
        </p>

        {/* Search Bar */}
        <h2>Search for your artist</h2>
        <SearchBar
          placeholder={placeholder}
          query={artistQuery}
          onChange={setArtistQuery}
          onSubmit={() => loadEvents(artistQuery)}
        />

        {artistQuery && (
          <>
            <h3>More about the artist</h3>
            <ArtistCard name={artistQuery} genre="Rhumba" country="Jamaica" />
          </>
        )}

        {/* Load the data */}
        {loading ? (
          <p>Loading the events</p>
        ) : events.length === 0 ? (
          <p>
            Sorry, there are no events for the artist {artistQuery} currently!
          </p>
        ) : (
          <>
            <h3>Events happening featuring {artistQuery} </h3>
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}{" "}
          </>
        )}
      </section>
    </main>
  );
}
