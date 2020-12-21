import styles from './table.module.css';

import React from 'react';
import cns from 'classnames';
import bind from 'memoize-bind';

//import TablePaginationBar from './TablePaginationBar';

function getColWidth(col) {
    let passProps = null;
    if (col.width) {
        passProps={
            style: {
                width: col.width
            }
        }
    }
    return passProps;
}

export default (props) => {
    const { items, columns, selectedRowId, onSelectRow } = props;

    function getColumns() {
        return (
            <tr>
                {columns.map((col, idx) => {
                    const passProps = getColWidth(col);
                    return (
                        <th
                            key={`${col.id}-header-${idx}`}
                            className={styles.tableHead}
                            {...passProps}
                        >
                            {col.label}
                        </th>
                    );
                })}
            </tr>
        );
    }

    function getValue(item, column, idx) {
        if (!column.value) {
            return '-';
        } else if (typeof column.value === 'string') {
            return item[column.value];
        } else if (typeof column.value === 'function') {
            return column.value(item, idx);
        }
    }

    const colums = getColumns();

    return (
        <div className={styles.tableContainer}>
            <table className={cns('pure-table', 'pure-table-horizontal', styles.table)}>
                <thead className={styles.tableHeader}>{colums}</thead>
                <tbody>
                    {items.map((item, idx) => {
                        return (
                            <tr
                                key={item.id}
                                className={cns(styles.tableRow, {
                                    active: item.id === selectedRowId
                                })}
                                onClick={bind(onSelectRow, this, item.id)}
                            >
                                {columns.map((col, idx) => {
                                    const passProps = getColWidth(col);
                                    return <td {...passProps} key={`${item.id}-col-${idx}`} className={styles.tableData}>{getValue(item, col, idx)}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/*<TablePaginationBar />*/}
        </div>
    );
}
