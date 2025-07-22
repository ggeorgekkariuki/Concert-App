"use client";
import { useState, useEffect } from "react";
import { fetchArtist } from "@/lib/fetchArtist";
import ArtistCard from "@/components/Artists/ArtistCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Artist } from "@/types/Artist";
import { ConcertEvent } from "@/types/Event";
import EventCard from "@/components/EventCard/EventCard";
import { fetchArtistEvents } from "@/lib/fetchArtistEvents";

export default function ArtistsPage() {
  // Loading states for Events and Artists
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  // This is the name of the artist
  const [artistQuery, setArtistQuery] = useState("Echo Pulse");
  // This is the information about the artist
  const [artistData, setArtistData] = useState<Artist>();
  // All Events FOR THIS artist stored in the database
  const [events, setEvents] = useState<ConcertEvent[]>([]);

  // Effect that runs when the page renders
  useEffect(() => {
    loadArtist(artistQuery);
    loadEvents(artistQuery);
  }, []);

  // Events from the Artist
  async function loadEvents(artist: string) {
    try {
      setLoadingEvent(true);
      const result = await fetchArtistEvents(artist);
      setEvents(result);
    } catch (error) {
      console.error("Events fetch failed:", error);
    } finally {
      setLoading(false);
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
          }}
          placeholder="Search by artist name..."
        />
      </section>

      <section>
        {loading ? (
          <p>Loading artist...</p>
        ) : artistData ? (
          <div>
            <h3>Who is {artistQuery}?</h3>
            <ArtistCard artist={artistData} />
          </div>
        ) : (
          <p>No artist found for "{artistQuery}".</p>
        )}

        {/* Load Artist Events Results */}
        {loadingEvent ? (
          <p>Loading</p>
        ) : events.length === 0 ? (
          <p>No events in the city of {artistQuery}!</p>
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
