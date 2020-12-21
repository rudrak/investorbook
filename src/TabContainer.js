import React, { useState } from 'react'

import HorizontalTabs from './components/common/HorizontalTabs';
import Investors from './components/investor/Panel';
import Companies from './components/company/Panel';

// Example of a component that uses apollo-client to fetch data.


const TabTypes = {
    INVESTORS: '_investors',
    COMPANIES: '_companies',
}

const HorizontalTabOptions = [
    {
        id: TabTypes.INVESTORS,
        label: 'Investors',
    },
    {
        id: TabTypes.COMPANIES,
        label: 'Companies',
    },
];

const PanelMap = {
    [TabTypes.INVESTORS]: Investors,
    [TabTypes.COMPANIES]: Companies,
};

export default () => {
    const [tab, setTabState] = useState(TabTypes.INVESTORS);

    function onTabSelect(selectedTabId) {
        setTabState(selectedTabId);
    }

    const SelectedPanel = PanelMap[tab];

    return (
        <>
            <HorizontalTabs
                tabs={HorizontalTabOptions}
                onSelect={onTabSelect}
                selectedTab={tab}
            />
            <SelectedPanel />
        </>
    );
}
