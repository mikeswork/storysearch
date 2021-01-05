import { ObjectId } from "bson";

async function getSpecificStory(mongoUser: Realm.User, storyId: string, fields?: object, returnWithCollect?: boolean) {
	// console.log("[getSpecificStory]");
	const mongodb = mongoUser.mongoClient("mongodb-atlas");
	const stories = mongodb.db("content").collection("approvedstories");

	const fOptions: Realm.Services.MongoDB.FindOneOptions = fields ? { projection: fields } : {};

    const doc = await stories.findOne({ _id: new ObjectId(storyId), available: true }, fOptions);

    if (returnWithCollect) return { story: doc, collection: stories };
	else return doc;
}

export { getSpecificStory };

async function getRandomStory(mongoUser: Realm.User, excludeId?: string, fields?: object) {
	// console.log("[getRandomStory]");

	const mongodb = mongoUser.mongoClient("mongodb-atlas");
	const stories = mongodb.db("content").collection("approvedstories");

	// In order to grab a random story, we only need the _id's
    let availableIds = await stories.find({}, { projection: { _id: 1 } });
    // console.log("[getRandomStory] availableIds:", availableIds);

    // Prevents the same story from being chosen twice in a row
    if (excludeId) {
        const filtered = availableIds.filter(id => id._id.toString() !== excludeId);

        // If there is only one story that's available (unlikely), don't exclude it
        if (filtered.length > 0) availableIds = filtered;
    }

	if (availableIds.length > 0) {
		const randomId = availableIds[Math.floor(Math.random() * availableIds.length)]._id;

		const fOptions: Realm.Services.MongoDB.FindOneOptions = fields ? { projection: fields } : {};
		const randomDoc = await stories.findOne({ _id: randomId }, fOptions);
		return randomDoc;
	} else {
		throw new Error("There are no stories to choose from.");
	}
}

export { getRandomStory };
