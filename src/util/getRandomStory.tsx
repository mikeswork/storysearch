async function getRandomStory(mongoUser: Realm.User, fields?: object) {
    // console.log("[getRandomStory]");

    const mongodb = mongoUser.mongoClient("mongodb-atlas");
    const stories = mongodb.db("content").collection("approvedstories");

    // In order to grab a random story, we only need the _id's
    const allIds = await stories.find({"available": true}, {projection: {"_id": 1}})
    
    if (allIds.length > 0) {
        const randomId = allIds[Math.floor(Math.random() * allIds.length)]._id;
        
        const fOptions: Realm.Services.MongoDB.FindOneOptions = (fields) ? {projection: fields} : {};
        const randomDoc = await stories.findOne({"_id": randomId}, fOptions);
        return randomDoc;
    } else {
        return Promise.reject("There are no stories to choose from.");
    }
}

export default getRandomStory;