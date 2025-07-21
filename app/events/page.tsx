"use client";
import { useState, useEffect } from "react";
import { fetchEvents } from "@/lib/fetchEvents";
import { ConcertEvent } from "@/types/Event";
import { error } from "console";

export default function EventsPage() {
  const city = "Amsterdam"
  const [events, setEvents] = useState<ConcertEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents(city)
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container">
      <section>
        {city ? (<h1>Concerts in {city}</h1>) : (<h1>Concerts Across Europe</h1>)}
        <p>Browse upcoming performances from all genres and cities.</p>
        {loading ? (<p>Loading</p>) : (
          events.length === 0 ? (<p>No events in the city of { city }</p>) : (
            <ul>
              { events.map((event, id) => (
                <li key={id}>
                  <strong>{event.title}</strong> - <strong>{event.date}</strong> by the artist {event.artist}
                </li>
              )) }
            </ul>
          )
        )}
      </section>

      <section>
        <h2>Genres to Explore</h2>
        <p>Electronic, Jazz, Rock, Indie, Classical, Folk…</p>
      </section>

      <section>
        <h2>Popular Cities</h2>
        <p>Berlin, Paris, Rome, Amsterdam, Vienna, Madrid</p>
      </section>
    </main>
  );
}
