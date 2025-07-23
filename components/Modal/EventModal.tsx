import styles from "./EventModal.module.css"
import { ConcertEvent } from "@/types/Event"

type EventModalProps = {
    event: ConcertEvent;
    onClose: () => void;
}

export default function EventModal ({event, onClose} : EventModalProps) {
    return (
        <div className={styles.overlay} onClick={onClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={onClose}>×</button>
            <h2>{event.title}</h2>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Location:</strong> {event.city}</p>
            <p><strong>Date:</strong> {event.date}</p>
            {event.country && <p>{event.country}</p>}
          </div>
        </div>
      );
}