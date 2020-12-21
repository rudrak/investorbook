import editorStyles from '../../utils/styles/editorPanel.module.css';
import panelStyles from '../../utils/styles/panel.module.css';
import styles from './investor.module.css';

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { FaChevronLeft } from 'react-icons/fa';
import { BsTrash, BsPencil } from 'react-icons/bs';

import Table from '../common/Table';

function getQuery(id) {
    return gql`
    query GetInvestors {
        investor(distinct_on:: ${id}) {
            id
            name
            photo_thumbnail
            investments {
                company {
                    name
                }
                amount
            }
        }
    }
`;
}

const columns = [
    {
        id: item => item.company.name,
        label: 'Name',
        value: item => {
            return (
                <div className={styles.identity}>
                    <div className={styles.investorName}>{item.company.name}</div>
                </div>
            );
        },
        width: '33%'
    },
    {
        id: item => item.company.name,
        label: 'Amount',
        value: item => (
            <div className={styles.identity}>
                <div className={styles.amount}>{item.amount}</div>
            </div>
        ),
        width: '33%'
    },
    {
        id: item => item.company.name,
        label: 'Actions',
        value: item => {
            return (
                <div className={styles.actions}>
                    <BsPencil className={styles.actionIcon} />
                    <BsTrash className={styles.actionIcon} />
                </div>
            );
        },
        width: '33%'
    },
];

export default (props) => {
    const { itemId } = props;
    //const { loading, error, data } = useQuery(getQuery(itemId));

    const [selectedRowId, setSelectedRowId] = useState('25');

    function onSelectRow(selectedRowId) {
        setSelectedRowId(selectedRowId);
    }

    const loading = null, error = null;
    const data = {investor: {
        name: 'Investor1',
        photo_thumbnail: 'https://randomuser.me/api/portraits/thumb/women/7.jpg',
        investments: [
            {
                company: { name: 'Comp1' },
                amount: 1000
            },
            {
                company: { name: 'Comp2' },
                amount: 10020
            },{
                company: { name: 'Comp3' },
                amount: 10400
            },{
                company: { name: 'Comp4' },
                amount: 13000
            },
        ]
    }};
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.investor.length === 0) return <p>The database is empty!</p>
    console.log(data);

    return (
        <div className={editorStyles.container}>
            <div className={panelStyles.header}>
                <div className={editorStyles.back}><FaChevronLeft /></div>
                <div className={editorStyles.identity}>
                    <img className={editorStyles.photo_thumbnail} src={data.investor.photo_thumbnail}/>
                    <div className={editorStyles.title}>
                        <div className={editorStyles.name}>{data.investor.name}</div>
                        <div className={editorStyles.subTitle}>Total Invested Amount: {5000}</div>
                    </div>
                </div>
                <div className={editorStyles.headerTools}>
                    <div className={editorStyles.toolSet}>
                        <BsPencil className={editorStyles.toolbarIcon} />
                        <div className={editorStyles.toolbarText}>Edit Name</div>
                    </div>
                    <div className={editorStyles.toolSet}>
                        <BsTrash className={editorStyles.toolbarIcon} />
                        <div className={editorStyles.toolbarText}>Remove Investor</div>
                    </div>
                </div>
            </div>
            <div className={editorStyles.content}>
                <div className={editorStyles.identity}>
                    Investors
                    <div className={editorStyles.add}>&#x0002B; Add Investor</div>
                </div>
                <div>
                    <Table
                        items={data.investor.investments}
                        columns={columns}
                        selectedRowId={selectedRowId}
                        onSelectRow={onSelectRow}
                        identifier={'id'} // improve on this later (function/Array support)
                    />
                </div>
            </div>
        </div>
    );
}
