"use client";
import { useState, useEffect } from "react";
import { fetchEvents } from "@/lib/fetchEvents";
import { ConcertEvent } from "@/types/Event";
import EventCard from "@/components/EventCard/EventCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import GenreFilter from "@/components/Genres/GenreFilter";

export default function EventsPage() {
  // Form information
  const placeholder = "Search Event By City ...";

  // All Events stored in the database
  const [events, setEvents] = useState<ConcertEvent[]>([]);

  // Flag to indicate if the data is still Loading
  const [loading, setLoading] = useState(false);

  // The current query or parameter AKA city
  //  to be search against in the database
  const [query, setQuery] = useState("Amsterdam");

  // Flag displaying genres chosen
  const [genre, setGenre] = useState('')

  // Load the data once on render
  useEffect(() => {
    loadEvents(query);
  }, []);

  async function loadEvents(city: string) {
    try {
      setLoading(true);
      const result = await fetchEvents(city);
      // Filter for genre
      const filteredData = genre ? result.filter((record) => record.genre === genre) : result
      setEvents(filteredData);
    } catch (error) {
      console.error("Events fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <section>
        {/* Header */}
        {query ? <h1>Concerts in {query}</h1> : <h1>Concerts Across Europe</h1>}
        <p>Browse upcoming performances from all genres and cities.</p>

        {/* Search bar */}
        <h2>Search events by city</h2>
        <SearchBar
          query={query}
          placeholder={placeholder}
          onSubmit={() => loadEvents(query)}
          onChange={setQuery}
        />

        {/* Load Results */}
        {loading ? (
          <p>Loading</p>
        ) : events.length === 0 ? (
          <p>No events in the city of {query}!</p>
        ) : (
          events.map((event) => <EventCard event={event} key={event.id} />)
        )}
      </section>

      <section>
        <h2>Genres to Explore</h2>
        <p>Electronic, Jazz, Rock, Indie, Classical, Folk…</p>
        <GenreFilter genre={genre} onChange={setGenre} />
      </section>

      <section>
        <h2>Popular Cities</h2>
        <p>Berlin, Paris, Rome, Amsterdam, Vienna, Madrid</p>
      </section>
    </main>
  );
}
