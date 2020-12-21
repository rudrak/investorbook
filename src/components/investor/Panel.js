import panelStyles from '../../utils/styles/panel.module.css';

import React, { useState } from 'react';

import InvestorEditor from './InvestorEditor';
import InvestorTable from './InvestorTable';

export default () => {
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [isCreate, onCreateClick] = useState(false);

    function onSelectRow(selectedRowId) {
        setSelectedRowId(selectedRowId);
    }

    function onCreateInvestor() {
        onCreateClick(true);
    }

    function onCloseEditor() {
        setSelectedRowId(null);
    }

    return (
        <div className={panelStyles.panel}>
            {selectedRowId ? (
                    <InvestorEditor
                        isCreate={isCreate}
                        itemId={selectedRowId}
                        onClose={onCloseEditor}
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
