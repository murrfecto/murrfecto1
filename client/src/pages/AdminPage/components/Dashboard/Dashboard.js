import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ViewAllCats from "../ViewAllCats/ViewAllCats";
import AddCat from "../AddCat/AddCat";
import './Dashboard.scss'
import {useState} from "react";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
// use outlet
    return (
        <div className='dashboard'>
            <Box sx={{flexGrow: 1, bgcolor: 'none', display: 'flex', height: 'auto'}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        minWidth: '144px',
                        color: '#4B3542',
                        '& .MuiTab-root:hover': {
                            color: '#867584',
                        },
                        '& .MuiTab-root': {
                            color: '#4B3542'
                    },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#D0BEC4",
                        },
                        "& .Mui-selected": {
                        color: "#4B3542 !important" ,
                    }}}
                >

                    <Tab sx={{fontWeight: 500, display: 'flex'}} label="Всі коти" {...a11yProps(0)} />
                    <Tab sx={{fontWeight: 500, display: 'flex', width: '100%'}} label="Додати кота" {...a11yProps(1)} />
                </Tabs>
                <TabPanel style={{width: '100%'}} value={value} index={0}>
                    <ViewAllCats/>
                </TabPanel>
                <TabPanel style={{width: '100%'}} value={value} index={1}>
                    <AddCat/>
                </TabPanel>
            </Box>
        </div>
    );
}
