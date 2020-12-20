import styles from './horizontalTabs.module.css';

import React from 'react';
import bind from 'memoize-bind';
import cns from 'classnames';


export default ({ tabs, onSelect, selectedTab }) => {
    console.log(`selectedTab: ${selectedTab}`);
    return (
        <div className={styles.horizontalTabs}>
            {tabs.map((tab) => {
                return (
                    <div
                        key={tab.id}
                        className={cns(styles.tab, {
                            [styles.active]:  selectedTab === tab.id
                        })}
                        onClick={bind(onSelect, this, tab.id)}
                    >
                        {tab.label}
                    </div>
                );
            })}
        </div>
    );
};
