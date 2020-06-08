const esClient = require('./client');
const createIndex = async function(indexName){
    return await esClient.indices.create({
        index: indexName
    });
}

module.exports = createIndex;


async function test(){
    try {
        const resp = await createIndex('dust');
        console.log(resp);
    } catch (e) {
        console.log(e);
    }
}
test();