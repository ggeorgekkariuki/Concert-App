import { fetchArtistAndEventsByID } from "@/lib/fetchArtistById";
import styles from "./ArtistsProfilePage.module.css";
import EventCard from "@/components/EventCard/EventCard";

// Param object used inside the AppRouter to create a url
type Props = {
  params: {
    id: string;
  };
};

export default async function ArtistProfilePage({ params }: Props) {
  const { artist, events } = await fetchArtistAndEventsByID(params.id);

  // This is a type guard to ensure that the artist value is not null
  if (!artist) {
    return (
      <div className="container">
        <h1>Sorry, artist not found 🎸</h1>
      </div>
    );
  }

  const metadata = {
    title: `${artist.name} – Artist Profile`,
    description: `Learn more about ${artist.name}, including genre, bio, and upcoming events.`,
  }
  

  return (
    <main className="container">
      {/* The artist section */}
      <section>
        <h1>{artist.name}</h1>
        <p>
          <strong>Genre:</strong> {artist.genre}
        </p>
        {artist.bio && (
          <p>
            <strong>Bio:</strong> {artist.bio}
          </p>
        )}
        {artist.country && (
          <p>
            <strong>Country:</strong> {artist.country}
          </p>
        )}
      </section>

      <section>
        <h2>Upcoming Events</h2>
        <div className={styles.grid}>
          {events && events.length > 0 ? (
            events.map((event) => (
              <div className={styles.cardWrapper} key={event.id}>
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <p>No events listed yet. Stay tuned! 🎶</p>
          )}
        </div>
      </section>
    </main>
  );
}
