import panelStyles from '../../utils/styles/panel.module.css';
import { FaSearch } from 'react-icons/fa';
import { useQuery, gql } from '@apollo/client';

import React from 'react';

import Button from '../common/Button';
import Table from '../common/Table';

const GET_INVESTORS = gql`
    query GetInvestors {
        investor(limit: 100) {
            id
            name
            photo_thumbnail
        }
    }
`;

const columns = [
    {
        id: item => item.id,
        label: 'Name',
        value: item => item.name
    },
    {
        id: item => item.id,
        label: 'Investments',
        value: item => item.details
    },
];

export default () => {
    const { loading, error, data } = useQuery(GET_INVESTORS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.investor.length === 0) return <p>The database is empty!</p>
    console.log(data);

    return (
        <div className={panelStyles.panel}>
            <div className={panelStyles.header}>
                <div className={panelStyles.heading}>Investors</div>
                <Button
                    label="Add Investor"
                    onClick={() => console.log('clicked')}
                />
                <div className={panelStyles.searchIcon}><FaSearch /></div>
            </div>
            <div className={panelStyles.panelContent}>
                <Table
                    items={data.investor}
                    columns={columns}
                />
            </div>
        </div>
    );
}
