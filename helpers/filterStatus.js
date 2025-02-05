module.exports = (query) => {
    let filterStatus = [
        {
            name: "All",
            status: "",
            class: "",
            deleted: false,
        },{
            name: "Active",
            status: "active",
            class: "",
            deleted: false,
        },{
            name: "Inactive",
            status: "inactive",
            class: "",
            deleted: false,
        },{
            name: "Deleted",
            status: "",
            class: "",
            deleted: true,
        }
    ]



    if(query.status && query.deleted != true) {
        const index = filterStatus.findIndex(item => item.status === query.status);
        filterStatus[index].class = "active";
    } else if (query.deleted){ // query.deleted is true
        const index = filterStatus.findIndex(item => item.status === "" && item.deleted);
        filterStatus[index].class = "active";
    } else { // query.status is empty (for filter all)
        const index = filterStatus.findIndex(item => item.status === "");
        filterStatus[index].class = "active";
    }

    return filterStatus;
}