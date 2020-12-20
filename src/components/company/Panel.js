import panelStyles from '../../utils/styles/panel.module.css';
import { FaSearch } from 'react-icons/fa';

import React from 'react';

import Button from '../common/Button';

export default () => {
    return (
        <div className={panelStyles.panel}>
            <div className={panelStyles.header}>
                <div className={panelStyles.heading}>Companies</div>
                <Button
                    label="Add Company"
                    onClick={() => console.log('clicked')}
                />
                <div className={panelStyles.searchIcon}><FaSearch /></div>
            </div>
        </div>
    );
}
