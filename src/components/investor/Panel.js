import panelStyles from '../../utils/styles/panel.module.css';

import React, { useState } from 'react';

import InvestorEditor from './InvestorEditor';
import InvestorTable from './InvestorTable';

export default () => {
    const [selectedRowId, setSelectedRowId] = useState('25');
    const [isCreate, onCreateClick] = useState(false);

    function onSelectRow(selectedRowId) {
        setSelectedRowId(selectedRowId);
    }

    function onCreateInvestor() {
        onCreateClick(true);
    }

    return (
        <div className={panelStyles.panel}>
            {selectedRowId ? (
                    <InvestorEditor
                        isCreate={isCreate}
                        itemId={selectedRowId}
                    />
                ) : (
                    <InvestorTable
                        onSelectRow={onSelectRow}
                        onSelectedRowId={selectedRowId}
                        onCreateInvestor={onCreateInvestor}
                    />
                )
            }
        </div>
    );
}
