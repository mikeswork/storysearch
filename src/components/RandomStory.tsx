import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import StoryView from "./StoryView";

interface RandomStoryProps {
	mongoUser: Realm.User | null;
}

// const Div = styled.div`
	
// `;

export default function RandomStory(props: RandomStoryProps) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [storyText, setStoryText] = useState("");
    
    useEffect(() => { 
        const getRandomStory = async () => {
            try {
                if(props.mongoUser !== null) {
                    const mongodb = props.mongoUser.mongoClient("mongodb-atlas");
                    const stories = mongodb.db("content").collection("approvedstories");

                    // In order to grab a random story, we only need the _id's
                    const allIds = await stories.find({}, {projection: {"_id": 1}})
                    if (allIds.length > 0) {
                        const randomId = allIds[Math.floor(Math.random() * allIds.length)]._id;
                        const randomDoc = await stories.findOne({"_id": randomId});

                        setTitle(randomDoc.title || "");
                        setAuthor(randomDoc.author || "");
                        setStoryText(randomDoc.body || "");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        getRandomStory();

    }, [props.mongoUser]);

	return (
        <StoryView title={title} author={author} text={storyText} />
	);
}
