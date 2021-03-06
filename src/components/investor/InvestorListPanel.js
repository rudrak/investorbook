import panelStyles from '../../utils/styles/panel.module.css';
import styles from './investor.module.css';

import React, { useState } from 'react';
import bind from 'memoize-bind';
import { useQuery, gql } from '@apollo/client';
import { FaSearch } from 'react-icons/fa';

import Button from '../common/Button';
import Table from '../common/Table';
import AddInvestorModal from './AddInvestorModal';

const GET_INVESTORS = gql`
    query GetInvestors {
        investor(limit: 5) {
            id
            name
            photo_thumbnail
            investments {
                company {
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
                    <img src={item.photo_thumbnail} className={styles.thumbnail} alt="alt-text"/>
                    <div className={styles.investorName}>{item.name}</div>
                </div>
            );
        },
        width: '25%'
    },
    {
        id: item => item.id,
        label: 'Investments',
        value: item => item.investments.map((investmentItem, idx) => {
            return (
                <span className={styles.investments} key={`${idx}-companyName`}>
                    { idx === 0 ? null : <span>&#x0002C;&nbsp;</span>}
                    <span>{investmentItem.company.name}</span>
                </span>
            );
        }),
        width: '75%'
    },
];

export default (props) => {
    const { onSelectRow, selectedRowId } = props;
    const { loading, error, data } = useQuery(GET_INVESTORS);

    const [showCreateModal, onCreateClick] = useState(false);

    function onToggleCreateInvestor(flag) {
        onCreateClick(flag);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.investor.length === 0) return <p>The database is empty!</p>
    console.log(data);

    return (
        <>
            <div className={panelStyles.header}>
                <div className={panelStyles.heading}>Investors</div>
                <Button
                    label="Add Investor"
                    onClick={bind(onToggleCreateInvestor, this, true)}
                />
                <div className={panelStyles.searchIcon}><FaSearch /></div>
            </div>
            <div className={panelStyles.panelContent}>
                <Table
                    items={data.investor}
                    columns={columns}
                    selectedRowId={selectedRowId}
                    onSelectRow={onSelectRow}
                    identifier={'id'} // improve on this later (function/Array support)
                />
            </div>
            {showCreateModal ? (
                    <AddInvestorModal
                        investorId={data.investor.id}
                        onClose={bind(onToggleCreateInvestor, this, false)}
                    />
                ) : null
            }
        </>
    );
}
