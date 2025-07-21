'use client';
import styles from './SearchBar.module.css';

type SearchBarProps = {
    placeholder : string;
    onSubmit: () => void; // Action performed when the button is clicked
    query: string;
    onChange: (value:string) => void; // The function that will fill this section allows the search box to be updated
}

export default function SearchBar ({onChange, placeholder, onSubmit, query}: SearchBarProps) {
    // Handles the submit button click
    function handleSubmit( e: React.FormEvent ) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Search</button>
        </form>
      );
}