import React from 'react';
import {Tab, TabsContainer} from "./styled";

export const Tabs = ({onChange, currentTab, items, getSymptoms}) => {

    const handleClick = (index, filter) => () => {
        onChange ? onChange(index) : void 0;
        getSymptoms(filter);
    };

    return (
        <TabsContainer>
            {
                items.map((item) => (
                    <Tab
                        key={item.index}
                        onClick={handleClick(item.index, item.filter)}
                        active={currentTab === item.index}
                    >
                        {item.label}
                    </Tab>
                ))
            }
        </TabsContainer>
    );
};