import React, {useContext} from 'react';
import {GlobalContext} from './Store';

const GlobalStateChanger = () => {
    const [, setGlobal] = useContext(GlobalContext)
    return(
        <>
            <center><button onClick={() => setGlobal('Global State has changed')}>Change Global State</button></center>
        </>
    )
};

export default GlobalStateChanger;