import { fbDB } from 'fBase';
import React, { useState } from 'react';

const Feed = ({ feedObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newFeed, setNewFeed] = useState(feedObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure?");
        if(ok)
        {
            await fbDB.doc(`feeds/${feedObj.id}`).delete();
        }
    }
    const toggleEditing = () => {
        setEditing(prev => !prev);
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        await fbDB.doc(`feeds/${feedObj.id}`).update({
            text:newFeed
        });
        setEditing(false);
    }
    const onChange = (e) => {
        const { value } = e.target;
        setNewFeed(value);
    }
    return (
        <div>
            {
                editing ?
                <>
                    <form onSubmit={onSubmit}>
                        <input value={newFeed} required placeholder="Edit your feed" onChange={onChange} />
                        <input type="submit" value="Update feed" />
                    </form>
                    <button onClick={toggleEditing}>Cancle</button>
                </>
                :
                <>
                <h3>{feedObj.text}</h3>
                {
                    isOwner &&
                    <>
                        <button onClick={onDeleteClick}>Delete Feed</button>
                        <button onClick={toggleEditing}>Edit Feed</button>
                    </>
                }
                </>
            }
        </div>
    )
}

export default Feed;