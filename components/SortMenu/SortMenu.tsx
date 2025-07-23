"use client";
import styles from "./SortMenu.module.css";

type Props = {
    sortKey: string;
    onChange: (value:string) => void;
}

export default function SortMenu({ sortKey, onChange }: Props) {
    return (
      <div className={styles.wrapper}>
        <label htmlFor="sort" className={styles.label}>Sort by:</label>
        <select
          id="sort"
          value={sortKey}
          onChange={(e) => onChange(e.target.value)}
          className={styles.select}
        >
          <option value="name">Name</option>
          <option value="country">Country</option>
        </select>
      </div>
    );
  }