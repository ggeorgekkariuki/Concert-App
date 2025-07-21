import styles from "./EventCard.module.css"
import { ConcertEvent } from "@/types/Event"

type EventProps = {
    event: ConcertEvent;
}

export default function EventCard({event} : EventProps) {
    return (
        <div className={styles.card}>
          <h2 className={styles.title}>{event.title}</h2>
          <p className={styles.details}>
            <strong>{event.artist}</strong> • {event.date}
          </p>
          <p className={styles.venue}>
            {event.venue}, {event.city}, {event.country}
          </p>
          <p className={styles.genre}>{event.genre}</p>
        </div>
      );
}