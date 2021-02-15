import { useState, useEffect } from 'react';
import AppRouter from './Router';
import { fbAuth } from '../fBase';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        fbAuth.onAuthStateChanged((user) => {
            if(user)
            {
                setUserObj(user);
            }
            else
            {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);
    return (
        <>
            {init ? <AppRouter userObj={userObj} /> : "initializing"}
            <footer>&copy; real-feed</footer>
        </>
    );
}

export default App;
