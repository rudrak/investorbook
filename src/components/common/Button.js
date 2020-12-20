import styles from './button.module.css';

import React from 'react';
import cns from 'classnames';

export default (props) => {
    const { label, onClick } = props;
    return (
        <button className={cns('pure-button', styles.simpleButton)}>{label}</button>
    );
}
