import React, {useState} from 'react';
export const GlobalContext = React.createContext();


const Store = ({children}) => {
    const[globalStateExample, setGlobal] = useState('Unchanged Global State');

return (
    <GlobalContext.Provider value={[globalStateExample, setGlobal]}><center><h1>{globalStateExample}</h1></center>
            {children}
    </GlobalContext.Provider>
);
};

export default Store;