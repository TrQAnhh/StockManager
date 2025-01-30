module.exports = (objectPagination, query, totalDocuments) => {
    // Get the current page from query (cần convert từ string -> number (màu vàng))
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    // The number of pages = total documents / the number of documents in each page
    const totalPage = Math.ceil(totalDocuments / objectPagination.limitItems);

    objectPagination.totalPages = totalPage;

    return objectPagination;
}