import panelStyles from '../../utils/styles/panel.module.css';
import styles from './company.module.css';
import { FaSearch } from 'react-icons/fa';
import { useQuery, gql } from '@apollo/client';

import React, { useState } from 'react';

import Button from '../common/Button';
import Table from '../common/Table';

const GET_COMPANIES = gql`
    query GetCompanies {
        company(limit: 5) {
            id
            name
            investments {
                investor {
                    name
                }
            }
        }
    }
`;

const columns = [
    {
        id: item => item.id,
        label: 'Name',
        value: item => {
            return (
                <div className={styles.identity}>
                    <div className={styles.companyName}>{item.name}</div>
                </div>
            );
        },
        width: '25%'
    },
    {
        id: item => item.id,
        label: 'Investors',
        value: item => item.investments.map((investorItem, idx) => {
            return (
                <span className={styles.investors} key={`${idx}-investorName`}>
                    { idx === 0 ? null : <span>&#x0002C;&nbsp;</span>}
                    <span>{investorItem.investor.name}</span>
                </span>
            );
        }),
        width: '75%'
    },
];

export default () => {
    const { loading, error, data } = useQuery(GET_COMPANIES);
    const [selectedRowId, setSelectedRowId] = useState(null);

    function onSelectRow(selectedRowId) {
        setSelectedRowId(selectedRowId);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.company.length === 0) return <p>The database is empty!</p>
    console.log(data);

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
            <div className={panelStyles.panelContent}>
                <Table
                    items={data.company}
                    columns={columns}
                    selectedRowId={selectedRowId}
                    onSelectRow={onSelectRow}
                    identifier={'id'} // improve on this later (function/Array support)
                />
            </div>
        </div>
    );
}
