import { useState } from 'react';
import AppRouter from './Router';
import firebase, {fbAuth} from '../fBase';

function App() {
    const [ isLogin, setIsLogin ] = useState(fbAuth.currentUser);
    return (
        <>
            <AppRouter isLogin={isLogin}/>
            <footer>&copy; real-feed</footer>
        </>
    );
}

export default App;
