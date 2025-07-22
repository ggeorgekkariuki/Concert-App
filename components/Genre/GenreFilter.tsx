'use client';
import styles from "./GenreFilter.module.css"

type GenreFilterProps = {
    genre: string;
    onChange: (value: string) => void;
}

export default function GenreFilter ({genre, onChange} : GenreFilterProps) {
    return (
        <div className={styles.wrapper}>
          <label htmlFor="genre" className={styles.label}>Filter by Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => onChange(e.target.value)}
            className={styles.select}
          >
            <option value="">All Genres</option>
            <option value="Jazz">Jazz</option>
            <option value="Techno">Techno</option>
            <option value="Soul">Soul</option>
            <option value="Electronic">Electronic</option>
            <option value="Indie">Indie</option>
            <option value="Classical">Classical</option>
            <option value="World">World</option>
          </select>
        </div>
      );
}