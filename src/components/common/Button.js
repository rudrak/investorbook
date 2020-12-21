import styles from './button.module.css';

import React from 'react';
import cns from 'classnames';

export default (props) => {
    const { label, onClick, isPrimary, isBasic, children } = props;
    const classes = cns('pure-button', styles.simpleButton, {
        [styles.isPrimary]: isPrimary,
        [styles.isBasic]: isBasic
    });
    return (
        <button className={classes} onClick={onClick}>{label || children}</button>
    );
}
