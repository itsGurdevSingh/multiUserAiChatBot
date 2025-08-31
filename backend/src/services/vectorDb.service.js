const { Pinecone } = require('@pinecone-database/pinecone');

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const gptCloneIndex = pc.index('gpt-clone')

const createMemory = async ({ memoryId, vector, metadata }) => {

    await gptCloneIndex.upsert([{
        id: memoryId,
        values: vector,
        metadata: metadata
    }])
}

const queryMemory = async ({ queryVector, limit = 5, metadata }) => {
    const data = await gptCloneIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? metadata : undefined,
        includeMetadata: true
    });

    return data.matches;
}

module.exports = {
    createMemory,
    queryMemory
}

