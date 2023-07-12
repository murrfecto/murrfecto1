import React from 'react';

import './ViewAll.scss';

import CatsGallery from "../../../../components/CatsGallery/CatsGallery";

const ViewAllCats = () => {
       return (
        <div className="viewAll">
            <h1 className='viewAll__title'>Всі коти</h1>
                <CatsGallery displayIcon={true} select={false}/>
        </div>
    );
};

export default ViewAllCats;
