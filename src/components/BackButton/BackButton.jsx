import React from 'react';
import { useHistory } from 'react-router';

const BackButton = () => {

    const { goBack } = useHistory()

    const moveBack = () => {
        goBack()
    }
    return (
        <div className='BackButton'>
            <img className="fake__button" src="https://res.cloudinary.com/dv4pkbmin/image/upload/v1621442755/Pruebas%20T%C3%A9cnicas/innoCV/previous_kizkio.png" alt="" width="40" onClick={moveBack}/>
        </div>
    );
};

export default BackButton;