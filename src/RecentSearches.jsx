import React from 'react';
import styles from './RecentSearches.module.css';

const RecentSearches = ({ searches, onSearchClick }) => {
  return (
    <div className={styles.recentSearches}>
      <h3>Recent Searches</h3>
      <ul className={styles.searchList}>
        {searches.map((city, index) => (
          <li key={index} onClick={() => onSearchClick(city)} className={styles.searchItem}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;