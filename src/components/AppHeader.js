import styles from './appHeader.module.css';

import React from 'react';

export default () => {
  return (
    <div className={styles.header}>
        {/*Dummy logo: REMOVE IT with image or something later*/}
        <span className={styles.blueLogo}>Investor</span>Book
    </div>
  );
}
