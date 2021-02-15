import Feed from 'components/Feed';
import { fbDB } from 'fBase';
import React, { useEffect, useState } from 'react';

function Home({ userObj }) {
    const [feedText, setFeedText] = useState("");
    const [feeds ,setFeeds] = useState([]);
    
    useEffect(()=>{
        fbDB.collection("feeds").orderBy("createdAt","desc").onSnapshot((snap)=>{
            const feedArray = snap.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }));
            setFeeds(feedArray);
        })
    },[])
    const onSubmit = async(e) => {
        e.preventDefault();
        if(feedText !== "" && feedText !== null)
        {
            let date = new Date();
            date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

            await fbDB.collection("feeds").add({
                text: feedText,
                createdAt: Date.now(),
                creatorId: userObj.uid
            });
            setFeedText("");
        }
    }
    const onChange = (e) => {
        const { value } = e.target;
        setFeedText(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's are you mind?" maxLength={120} value={feedText} onChange={onChange} />
                <input type="submit" value="Feed!" />
            </form>
            <div>
                {feeds.map(feedObj => 
                    <Feed key={feedObj.id} feedObj={feedObj} isOwner={feedObj.creatorId === userObj.uid} />
                )}
            </div>
        </div>
    )
}

export default Home;