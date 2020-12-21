import panelStyles from '../../utils/styles/panel.module.css';

import React, { useState } from 'react';

import InvestorEditor from './InvestorEditor';
import InvestorListPanel from './InvestorListPanel';

export default () => {
    const [selectedRowId, setSelectedRowId] = useState(null);

    function onSelectRow(selectedRowId) {
        setSelectedRowId(selectedRowId);
    }

    function onCloseEditor() {
        setSelectedRowId(null);
    }

    return (
        <div className={panelStyles.panel}>
            {selectedRowId ? (
                    <InvestorEditor
                        itemId={selectedRowId}
                        onClose={onCloseEditor}
                    />
                ) : (
                    <InvestorListPanel
                        onSelectRow={onSelectRow}
                        onSelectedRowId={selectedRowId}
                    />
                )
            }
        </div>
    );
}
