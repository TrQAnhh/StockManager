module.exports = (query) => {
    let searchObject = {
        keyword: "",
    }

    if(query.keyword) {
        searchObject.keyword = query.keyword;

        // const regex = /keyword/i;

        const regex= new RegExp(searchObject.keyword, "i");

        searchObject.regex = regex;
    }

    return searchObject;
}