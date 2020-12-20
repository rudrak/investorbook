import styles from './App.module.css';

import React from 'react';
import TabContainer from './TabContainer'
import AppHeader from './components/AppHeader';

function App() {
  return (
    <div className={styles.App}>
        <AppHeader />
        <TabContainer />
    </div>
  );
}

export default App;
