import { fbAuth } from 'fBase';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
    const history = useHistory();
    const onLogout = () => {
        fbAuth.signOut();
        history.push("/");
    }
    return (
        <button onClick={onLogout}>
            Logout
        </button>
    )
}

export default Profile;