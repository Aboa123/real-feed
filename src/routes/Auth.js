import { fbAuth, fBase } from 'fBase';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        if(name === "email")
        {
            setEmail(value)
        }
        else if(name === "password")
        {
            setPassword(value)
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            if(newAccount)
            {
                await fbAuth.createUserWithEmailAndPassword(email, password);
            }
            else
            {
                await fbAuth.signInWithEmailAndPassword(email, password);
            }
        } catch(e) {
            setError(e.message);
        }
    }
    const togleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async(e) => {
        const { name } = e.target;
        let provider;
        if(name === "google")
        {
            provider = new fBase.auth.GoogleAuthProvider();
            
        }
        else if(name === "github")
        {
            provider = new fBase.auth.GithubAuthProvider();
        }
        await fbAuth.signInWithPopup(provider);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Login"} />
                {error}
            </form>
            <span onClick={togleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Coutinue with Google</button>
                <button name="github" onClick={onSocialClick}>Coutinue with Gighub</button>
            </div>
        </div>
    )
}

export default Auth;