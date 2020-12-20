import styles from './table.module.css';

import React from 'react';
import cns from 'classnames';

export default (props) => {
    const { items, columns } = props;

    function getColumns() {
        return (
            <tr>
                {columns.map((col, idx) => {
                    return (
                        <th
                            key={`${col.id}-header-${idx}`}
                            className={styles.tableHead}
                        >
                            {col.label}
                        </th>
                    );
                })}
            </tr>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <table className={cns('pure-table', 'pure-table-horizontal', styles.table)}>
                <thead className={styles.tableHeader}>{getColumns()}</thead>
                <tbody>{items.map(item => {
                    return (
                        <tr
                            key={item.id}
                            className={styles.tableRow}
                        >
                            <td className={styles.tableData}>{item.id}</td>
                            <td className={styles.tableData}>{item.name}</td>
                        </tr>
                    );
                })}</tbody>
            </table>
        </div>
    );
}
